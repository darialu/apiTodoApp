# mainacad-diploma-api
Main Academy Front-end course Diploma API

API projects endpoints:             
+ **/projects GET** Get list of all projects
+ **/projects POST** Add new project
+ **/projects/:id PUT** Edit project
+ **/projects/:id DELETE** Remove Project
+ **/projects/:id/employees GET ** Get a list of employees (team) for the project
 
API employees endpoints:             
+ **/employees GET** Get list of all employees
+ **/employees POST** Add new employee
+ **/employees/:id PUT** Edit employee's data
+ **/employees/:id DELETE** Remove employee
+ **/employees/:id/projects GET** Get employees projects list

API tasks endpoints:             
+ **/projects/:id/tasks GET** Get list of tasks for project
+ **/employees/:id/tasks GET** Get list of tasks for employee
+ **/tasks/:id PUT** Edit tasks's data
+ **/tasks/:id DELETE** Remove employee

Notes:
+ You can change projects team by changing it's "employees" property (array of employees id's)
