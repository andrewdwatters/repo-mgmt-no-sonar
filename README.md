# Running to Clone Repositories
1. run: `git clone https://github.com/Andrewdwatters1/repo-mgmt-with-sonarqube.git && cd repo-mgmt-with-sonarqube`)
2. run: `npm install`
3. run: `npm run server`
4. run: `cd && cd Desktop && mkdir Apprentice-Repositories && cd Apprentice-Repositories`
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