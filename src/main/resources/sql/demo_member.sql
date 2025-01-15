CREATE TABLE `demo_member` (
`id`  int(6) NOT NULL AUTO_INCREMENT ,
`account`  varchar(60) NOT NULL ,
`password`  varchar(60) NOT NULL ,
`status`  int(2) NOT NULL ,
`role`  varchar(12) NOT NULL ,
`update_By`  varchar(60) NOT NULL ,
`update_Date`  date NOT NULL ,
PRIMARY KEY (`id`)
)
;

