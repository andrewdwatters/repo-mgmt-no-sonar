# Running to Clone Repositories
1. run: `git clone https://github.com/TechtonicAcademy/repo-mgmt-no-sonar.git`
2. run: `cd repo-mgmt-no-sonar`
2. run: `npm install`
3. run: `npm run server`
4. Open a new terminal window and run: `cd && cd Desktop && mkdir Apprentice-Repositories && cd Apprentice-Repositories`
5. run: `pwd` and copy this directory to your clipboard
6. Open postman and send a `POST` request to `http://localhost:4001/clone` with the following as your request body (as JSON)
```
   {
      "cohort": "subduction",
      "repo": "car-dealership-console-app",
      "source": "github classroom",
      "outputDir": *
   }
```
* **For the `outputDir`, paste the directory from step 10**

* **Note that the above request body is an example, update the cohort and repo properties as needed for different projects**
