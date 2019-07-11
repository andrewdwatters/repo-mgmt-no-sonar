const { db } = require("../util/firebase.js");
const { execSync } = require("child_process");

const exampleRequestBody = {
  cohort: "subduction",
  repo: "car-dealership-console-app",
  source: "github classroom",
  outputDir:
    "/Users/andrewwatters/Documents/Instruction/Feedback-and-Student-Review/Subduction/by-student"
};

module.exports = {
  massClone: (req, res) => {
    const { cohort, repo, source, outputDir } = req.body;
    if (!cohort || !repo || !outputDir || !source) {
      res
        .status(400)
        .send({ success: false, message: "Missing required parameters" });
    }

    try {
      db.ref("/cohorts/" + cohort)
        .once("value")
        .then(async snap => {
          let { names, githubAccounts } = snap.val();
          names = names.map(name => name.split(" ").join(""));
          const results = [];
          for (let i = 0; i < names.length; i++) {
            const absPath = `${outputDir}/${names[i]}`;
            if (!apprenticeDirectoryExists(absPath)) {
              createApprenticeDirectory(absPath, res);
            }
            const sourceIsGithubClassroom = /classroom/i.test(source);
            const finalOutputDir = `${outputDir}/${names[i]}/${repo}`;
            let outcome;
            if (sourceIsGithubClassroom) {
              outcome = await initChildProcess(
                `git clone https://github.com/TechtonicAcademy/${repo}-${
                  githubAccounts[i]
                }.git ${finalOutputDir}`,
                res
              );
            } else {
              outcome = await initChildProcess(
                `git clone https://github.com/${
                  githubAccounts[i]
                }/${repo}.git ${finalOutputDir}`,
                res
              );
            }
            results.push({
              name: names[i],
              operationSuccessful: outcome
            });
          }
          res.status(200).send([
            {
              metaData: {
                repo,
                outputDir
              }
            },
            ...results
          ]);
        });
    } catch (err) {
      console.log("Error: " + err);
    }
  }
};

// return true if dir exists false otherwise
const apprenticeDirectoryExists = absPath => {
  execSync(
    `if [ -d ${absPath} ]; then echo 1; else echo 0; fi`,
    (_, stdout) => {
      return stdout;
    }
  );
};

// create dir if not exists
const createApprenticeDirectory = (absPath, res) => {
  execSync(`if [ ! -d ${absPath} ]; then mkdir ${absPath}; fi`, err => {
    if (err) {
      res.status(500).send("Error creating apprentice directory");
      return false;
    } else {
      console.log(`Output directory exists at ${absPath}`);
      return true;
    }
  });
};

// returns true if op succeeded, false otherwise
const initChildProcess = async (cmd) => { 
  try {
    return !!await execSync(cmd, (err, stdout) => {
      if(!err) return true;
    }).toJSON().data
  } catch (err) {
    return false;
  }
};
