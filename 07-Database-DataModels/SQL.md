
## SQL Databases

Are the traditional model of storing Data,
examples are MySQL, MariaDB, WebSQL, PostgreSQL,
ORACLE.

SELECT name, age FROM users WHERE name = "anx";

## User and Schedule Tables

| id | name | age | job     |
| 01 | anx  | 25  | teacher | <<
| 02 | anx  | 36  | teacher |  ^
| 03 | fly  | 36  | nurse   |  ^
                               ^
| day | time  | userId |       ^
| mo  | 8:00  | 01     | >>>>>>^ Association
| tue | 8:00  | 02     |
| tue | 11:00 | 03     |

## Key-Values Stores

Are the hipster versions of storing data,
we use them because they are fast and easy
to use.

LevelDB, memcached, mongodb, LocalStorage

... can be interpreted as a very simple SQL
table that only has 2 fields...

| key      | value                  |
| user     | {... all the users}    |
| schedule | {...all the schedules} | 

## SQL Databases

... can be interpreted as a very fancy KV-Store...

| id | { name, age, job }
| 01 | { name:'anx', age:'25', job: 'teacher' }
| 02 | { name:'anx', age:'36', job: 'teacher' }
| 03 | { name:'fly', age:'36', job: 'nurse'   }
  