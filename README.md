# SEP6

The "issues" that we need to solve are present in GitHub Issues. There you can create some for yourself (such as new features or bugfixes).
These issues are grouped in GitHub Project, inside the SEP6 Kanban Board.

When starting to work on a task:
    1. Create a new branch with the name of the task from the board.
    2. Do your work (commit and push).
    3. Create a pull request to merge your branch into master.

    OBS: In order to be merged into master, the branch has to be reviewed and approved by 2 reviewers.

We have CI (Continuous Integration), but not CD (Countinuous Delivery). That means that as soon you push to your working branch, you can check on GitHub if your branch has been correctly built and all the tests are running (if any). We will have to manually deploy to Google Cloud App Engine.

Right now we have a version up and running:

https://semester-project-6.ew.r.appspot.com/

Until new versions will be deployed :)
We will have of course to replace the existing frontend with ours.