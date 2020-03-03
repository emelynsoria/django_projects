BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "django_migrations" (
	"id"	integer NOT NULL,
	"app"	varchar(255) NOT NULL,
	"name"	varchar(255) NOT NULL,
	"applied"	datetime NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "auth_group_permissions" (
	"id"	integer NOT NULL,
	"group_id"	integer NOT NULL,
	"permission_id"	integer NOT NULL,
	FOREIGN KEY("group_id") REFERENCES "auth_group"("id") DEFERRABLE INITIALLY DEFERRED,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("permission_id") REFERENCES "auth_permission"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "auth_user_groups" (
	"id"	integer NOT NULL,
	"user_id"	integer NOT NULL,
	"group_id"	integer NOT NULL,
	FOREIGN KEY("group_id") REFERENCES "auth_group"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("user_id") REFERENCES "auth_user"("id") DEFERRABLE INITIALLY DEFERRED,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "auth_user_user_permissions" (
	"id"	integer NOT NULL,
	"user_id"	integer NOT NULL,
	"permission_id"	integer NOT NULL,
	FOREIGN KEY("user_id") REFERENCES "auth_user"("id") DEFERRABLE INITIALLY DEFERRED,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("permission_id") REFERENCES "auth_permission"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "django_admin_log" (
	"id"	integer NOT NULL,
	"action_time"	datetime NOT NULL,
	"object_id"	text,
	"object_repr"	varchar(200) NOT NULL,
	"change_message"	text NOT NULL,
	"content_type_id"	integer,
	"user_id"	integer NOT NULL,
	"action_flag"	smallint unsigned NOT NULL CHECK("action_flag" >= 0),
	FOREIGN KEY("content_type_id") REFERENCES "django_content_type"("id") DEFERRABLE INITIALLY DEFERRED,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("user_id") REFERENCES "auth_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "django_content_type" (
	"id"	integer NOT NULL,
	"app_label"	varchar(100) NOT NULL,
	"model"	varchar(100) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "auth_permission" (
	"id"	integer NOT NULL,
	"content_type_id"	integer NOT NULL,
	"codename"	varchar(100) NOT NULL,
	"name"	varchar(255) NOT NULL,
	FOREIGN KEY("content_type_id") REFERENCES "django_content_type"("id") DEFERRABLE INITIALLY DEFERRED,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "auth_user" (
	"id"	integer NOT NULL,
	"password"	varchar(128) NOT NULL,
	"last_login"	datetime,
	"is_superuser"	bool NOT NULL,
	"username"	varchar(150) NOT NULL UNIQUE,
	"first_name"	varchar(30) NOT NULL,
	"email"	varchar(254) NOT NULL,
	"is_staff"	bool NOT NULL,
	"is_active"	bool NOT NULL,
	"date_joined"	datetime NOT NULL,
	"last_name"	varchar(150) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "auth_group" (
	"id"	integer NOT NULL,
	"name"	varchar(150) NOT NULL UNIQUE,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "blog_post" (
	"id"	integer NOT NULL,
	"title"	varchar(255) NOT NULL,
	"content"	text NOT NULL,
	"date_posted"	datetime NOT NULL,
	"blog_photo"	varchar(100),
	"user_id"	integer NOT NULL,
	FOREIGN KEY("user_id") REFERENCES "auth_user"("id") DEFERRABLE INITIALLY DEFERRED,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "portfolio_workexperience" (
	"id"	integer NOT NULL,
	"job_title"	varchar(50) NOT NULL,
	"work_description"	text NOT NULL,
	"location"	varchar(100) NOT NULL,
	"inclusive_dates"	varchar(50) NOT NULL,
	"user_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("user_id") REFERENCES "auth_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "portfolio_skill" (
	"id"	integer NOT NULL,
	"skill"	varchar(50) NOT NULL,
	"skill_details"	varchar(250) NOT NULL,
	"skill_photo"	varchar(100) NOT NULL,
	"user_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("user_id") REFERENCES "auth_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "portfolio_project" (
	"id"	integer NOT NULL,
	"project_title"	varchar(150) NOT NULL,
	"project_description"	text NOT NULL,
	"project_photo"	varchar(100) NOT NULL,
	"user_id"	integer NOT NULL,
	FOREIGN KEY("user_id") REFERENCES "auth_user"("id") DEFERRABLE INITIALLY DEFERRED,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "portfolio_profile" (
	"id"	integer NOT NULL,
	"user_photo"	varchar(100) NOT NULL,
	"about"	text NOT NULL,
	"user_id"	integer NOT NULL UNIQUE,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("user_id") REFERENCES "auth_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "portfolio_othercontact" (
	"id"	integer NOT NULL,
	"site"	varchar(3) NOT NULL,
	"link"	varchar(200) NOT NULL,
	"profile_id"	integer NOT NULL,
	FOREIGN KEY("profile_id") REFERENCES "portfolio_profile"("id") DEFERRABLE INITIALLY DEFERRED,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "portfolio_educationalbackground" (
	"id"	integer NOT NULL,
	"school_name"	varchar(150) NOT NULL,
	"school_duration"	varchar(20) NOT NULL,
	"school_type"	varchar(40) NOT NULL,
	"school_description"	text NOT NULL,
	"user_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("user_id") REFERENCES "auth_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "portfolio_contact" (
	"id"	integer NOT NULL,
	"contact_type"	varchar(8) NOT NULL,
	"contact_details"	varchar(200) NOT NULL,
	"profile_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("profile_id") REFERENCES "portfolio_profile"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "portfolio_award" (
	"id"	integer NOT NULL,
	"award_title"	varchar(100) NOT NULL,
	"award_detail"	varchar(200) NOT NULL,
	"award_date"	date NOT NULL,
	"user_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("user_id") REFERENCES "auth_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "django_session" (
	"session_key"	varchar(40) NOT NULL,
	"session_data"	text NOT NULL,
	"expire_date"	datetime NOT NULL,
	PRIMARY KEY("session_key")
);
INSERT INTO "django_migrations" VALUES (1,'contenttypes','0001_initial','2020-01-23 09:33:44.488568');
INSERT INTO "django_migrations" VALUES (2,'auth','0001_initial','2020-01-23 09:33:44.625241');
INSERT INTO "django_migrations" VALUES (3,'admin','0001_initial','2020-01-23 09:33:44.753654');
INSERT INTO "django_migrations" VALUES (4,'admin','0002_logentry_remove_auto_add','2020-01-23 09:33:44.873427');
INSERT INTO "django_migrations" VALUES (5,'admin','0003_logentry_add_action_flag_choices','2020-01-23 09:33:44.977236');
INSERT INTO "django_migrations" VALUES (6,'contenttypes','0002_remove_content_type_name','2020-01-23 09:33:45.065198');
INSERT INTO "django_migrations" VALUES (7,'auth','0002_alter_permission_name_max_length','2020-01-23 09:33:45.136948');
INSERT INTO "django_migrations" VALUES (8,'auth','0003_alter_user_email_max_length','2020-01-23 09:33:45.223794');
INSERT INTO "django_migrations" VALUES (9,'auth','0004_alter_user_username_opts','2020-01-23 09:33:45.334320');
INSERT INTO "django_migrations" VALUES (10,'auth','0005_alter_user_last_login_null','2020-01-23 09:33:45.432116');
INSERT INTO "django_migrations" VALUES (11,'auth','0006_require_contenttypes_0002','2020-01-23 09:33:45.519350');
INSERT INTO "django_migrations" VALUES (12,'auth','0007_alter_validators_add_error_messages','2020-01-23 09:33:45.620701');
INSERT INTO "django_migrations" VALUES (13,'auth','0008_alter_user_username_max_length','2020-01-23 09:33:45.707242');
INSERT INTO "django_migrations" VALUES (14,'auth','0009_alter_user_last_name_max_length','2020-01-23 09:33:45.788590');
INSERT INTO "django_migrations" VALUES (15,'auth','0010_alter_group_name_max_length','2020-01-23 09:33:45.886023');
INSERT INTO "django_migrations" VALUES (16,'auth','0011_update_proxy_permissions','2020-01-23 09:33:45.960976');
INSERT INTO "django_migrations" VALUES (17,'blog','0001_initial','2020-01-23 09:33:46.052445');
INSERT INTO "django_migrations" VALUES (18,'portfolio','0001_initial','2020-01-23 09:33:46.200321');
INSERT INTO "django_migrations" VALUES (19,'sessions','0001_initial','2020-01-23 09:33:46.326007');
INSERT INTO "django_admin_log" VALUES (1,'2020-01-23 09:38:03.442579','2','em','[{"added": {}}]',4,1,1);
INSERT INTO "django_admin_log" VALUES (2,'2020-01-23 09:38:15.358977','2','em','[{"changed": {"fields": ["First name", "Last name"]}}]',4,1,2);
INSERT INTO "django_admin_log" VALUES (3,'2020-01-23 09:38:24.009799','3','chloe','[{"added": {}}]',4,1,1);
INSERT INTO "django_admin_log" VALUES (4,'2020-01-23 09:38:31.871493','3','chloe','[{"changed": {"fields": ["First name", "Last name"]}}]',4,1,2);
INSERT INTO "django_admin_log" VALUES (5,'2020-01-23 09:38:50.465821','4','geralt','[{"added": {}}]',4,1,1);
INSERT INTO "django_admin_log" VALUES (6,'2020-01-23 09:39:00.333461','4','geralt','[{"changed": {"fields": ["First name", "Last name"]}}]',4,1,2);
INSERT INTO "django_admin_log" VALUES (7,'2020-01-23 09:55:50.540058','1','chloe','[{"added": {}}]',11,1,1);
INSERT INTO "django_admin_log" VALUES (8,'2020-01-24 01:21:11.618542','2','em','[{"added": {}}]',11,1,1);
INSERT INTO "django_admin_log" VALUES (9,'2020-01-24 01:21:31.993464','3','geralt','[{"added": {}}]',11,1,1);
INSERT INTO "django_admin_log" VALUES (10,'2020-01-24 01:23:12.404110','4','The Movie','[{"changed": {"fields": ["Content", "Blog photo"]}}]',7,1,2);
INSERT INTO "django_admin_log" VALUES (11,'2020-01-24 01:37:27.586948','2','Sample JT','',8,1,3);
INSERT INTO "django_admin_log" VALUES (12,'2020-01-24 01:37:27.672579','1','Sample JT','',8,1,3);
INSERT INTO "django_admin_log" VALUES (13,'2020-01-24 01:37:34.756232','3','Sample JT','[{"changed": {"fields": ["User"]}}]',8,1,2);
INSERT INTO "django_admin_log" VALUES (14,'2020-01-24 01:41:29.023623','6','General Education and Vocational School','[{"changed": {"fields": ["User"]}}]',13,1,2);
INSERT INTO "django_admin_log" VALUES (15,'2020-01-24 01:41:35.423680','4','Philippine Science High School','[{"changed": {"fields": ["User"]}}]',13,1,2);
INSERT INTO "django_admin_log" VALUES (16,'2020-01-24 01:41:40.018533','3','Massachusetts Institute of Technology','[{"changed": {"fields": ["User"]}}]',13,1,2);
INSERT INTO "django_admin_log" VALUES (17,'2020-01-24 01:41:44.020152','2','Bicol University','[{"changed": {"fields": ["User"]}}]',13,1,2);
INSERT INTO "django_admin_log" VALUES (18,'2020-01-24 01:58:17.123614','7','FRONT-END DEVELOPER','[{"changed": {"fields": ["User"]}}]',8,1,2);
INSERT INTO "django_admin_log" VALUES (19,'2020-01-24 01:58:37.684407','5','FRONT-END RAILS DEVELOPER','[{"changed": {"fields": ["User"]}}]',8,1,2);
INSERT INTO "django_admin_log" VALUES (20,'2020-01-24 01:58:41.427286','6','Cloud System Engineer','[{"changed": {"fields": ["User"]}}]',8,1,2);
INSERT INTO "django_admin_log" VALUES (21,'2020-01-24 01:58:53.039363','7','Front-End Developer','[{"changed": {"fields": ["Job title"]}}]',8,1,2);
INSERT INTO "django_admin_log" VALUES (22,'2020-01-24 01:59:28.312851','5','Front-End Rails Developer','[{"changed": {"fields": ["Job title"]}}]',8,1,2);
INSERT INTO "django_admin_log" VALUES (23,'2020-01-24 02:00:12.646231','4','Web DEVELOPER / Graphic Designereveloper','[{"changed": {"fields": ["Job title"]}}]',8,1,2);
INSERT INTO "django_admin_log" VALUES (24,'2020-01-24 02:00:18.826673','4','Web Developer / Graphic Designereveloper','[{"changed": {"fields": ["Job title"]}}]',8,1,2);
INSERT INTO "django_admin_log" VALUES (25,'2020-01-24 02:00:28.922005','2','Lead Web Developer','[{"changed": {"fields": ["User", "Job title", "Work description"]}}]',8,1,2);
INSERT INTO "django_admin_log" VALUES (26,'2020-01-24 02:00:41.629657','1','Front-End Developer','[{"changed": {"fields": ["Job title"]}}]',8,1,2);
INSERT INTO "django_admin_log" VALUES (27,'2020-01-24 02:10:20.356163','6','Handraiser Application','[{"changed": {"fields": ["User", "Project photo"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (28,'2020-01-24 02:10:37.068914','4','IoT Sample Project','[{"changed": {"fields": ["Project photo"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (29,'2020-01-24 02:10:52.187336','3','Blah Sample Website','[{"changed": {"fields": ["Project photo"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (30,'2020-01-24 02:10:56.544493','3','Blah Sample Website','[{"changed": {"fields": ["User"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (31,'2020-01-24 02:11:07.019731','2','Digital Landscape','[{"changed": {"fields": ["User", "Project photo"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (32,'2020-01-24 02:11:12.018074','3','Blah Sample Website','[{"changed": {"fields": ["Project photo"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (33,'2020-01-24 02:11:23.808335','1','Creative ABC Pages','[{"changed": {"fields": ["User", "Project photo"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (34,'2020-01-24 02:20:56.925251','3','Hello','[{"changed": {"fields": ["Content"]}}]',7,1,2);
INSERT INTO "django_admin_log" VALUES (35,'2020-01-24 03:36:43.406184','7','Front-End Developer','[]',8,1,2);
INSERT INTO "django_admin_log" VALUES (36,'2020-01-24 05:16:55.893874','12','0','',8,1,3);
INSERT INTO "django_admin_log" VALUES (37,'2020-01-24 05:16:55.968757','11','0','',8,1,3);
INSERT INTO "django_admin_log" VALUES (38,'2020-01-24 05:16:56.026904','10','0','',8,1,3);
INSERT INTO "django_admin_log" VALUES (39,'2020-01-24 05:16:56.113052','9','dsfsd','',8,1,3);
INSERT INTO "django_admin_log" VALUES (40,'2020-01-24 06:07:18.908984','9','hgjghjkgk','',7,1,3);
INSERT INTO "django_admin_log" VALUES (41,'2020-01-24 07:25:36.401034','15','0','',8,1,3);
INSERT INTO "django_admin_log" VALUES (42,'2020-01-24 07:25:36.472698','14','0','',8,1,3);
INSERT INTO "django_admin_log" VALUES (43,'2020-01-24 07:25:36.530872','13','0','',8,1,3);
INSERT INTO "django_admin_log" VALUES (44,'2020-01-24 08:08:42.155272','7','Front-End Developer','',8,1,3);
INSERT INTO "django_admin_log" VALUES (45,'2020-01-27 03:28:14.901757','2','Lead Web Developer','[{"changed": {"fields": ["Work description"]}}]',8,1,2);
INSERT INTO "django_admin_log" VALUES (46,'2020-01-27 03:30:03.736993','2','Lead Web Developer','[{"changed": {"fields": ["Work description"]}}]',8,1,2);
INSERT INTO "django_admin_log" VALUES (47,'2020-01-27 03:36:03.389615','27','','',8,1,3);
INSERT INTO "django_admin_log" VALUES (48,'2020-01-27 03:36:03.522947','26','','',8,1,3);
INSERT INTO "django_admin_log" VALUES (49,'2020-01-27 03:36:21.203050','8','Sample Job Title','[{"changed": {"fields": ["Inclusive dates"]}}]',8,1,2);
INSERT INTO "django_admin_log" VALUES (50,'2020-01-27 08:13:29.217370','34','Lead Web Developer','',8,1,3);
INSERT INTO "django_admin_log" VALUES (51,'2020-01-27 08:24:10.941734','1','Most Innovative Blah Blah','[{"added": {}}]',15,1,1);
INSERT INTO "django_admin_log" VALUES (52,'2020-01-27 08:24:30.248824','2','''The Best Designs''','[{"added": {}}]',15,1,1);
INSERT INTO "django_admin_log" VALUES (53,'2020-01-27 08:24:39.528783','3','CSS Design Awards','[{"added": {}}]',15,1,1);
INSERT INTO "django_admin_log" VALUES (54,'2020-01-27 08:24:47.593304','4','Most Loved Site','[{"added": {}}]',15,1,1);
INSERT INTO "django_admin_log" VALUES (55,'2020-01-28 01:58:07.273765','1','Eating','[{"added": {}}]',9,1,1);
INSERT INTO "django_admin_log" VALUES (56,'2020-01-28 01:59:24.088589','2','Programming','[{"added": {}}]',9,1,1);
INSERT INTO "django_admin_log" VALUES (57,'2020-01-28 02:00:20.152842','3','Web Development','[{"added": {}}]',9,1,1);
INSERT INTO "django_admin_log" VALUES (58,'2020-01-28 02:00:55.200642','4','Acting','[{"added": {}}]',9,1,1);
INSERT INTO "django_content_type" VALUES (1,'admin','logentry');
INSERT INTO "django_content_type" VALUES (2,'auth','permission');
INSERT INTO "django_content_type" VALUES (3,'auth','group');
INSERT INTO "django_content_type" VALUES (4,'auth','user');
INSERT INTO "django_content_type" VALUES (5,'contenttypes','contenttype');
INSERT INTO "django_content_type" VALUES (6,'sessions','session');
INSERT INTO "django_content_type" VALUES (7,'blog','post');
INSERT INTO "django_content_type" VALUES (8,'portfolio','workexperience');
INSERT INTO "django_content_type" VALUES (9,'portfolio','skill');
INSERT INTO "django_content_type" VALUES (10,'portfolio','project');
INSERT INTO "django_content_type" VALUES (11,'portfolio','profile');
INSERT INTO "django_content_type" VALUES (12,'portfolio','othercontact');
INSERT INTO "django_content_type" VALUES (13,'portfolio','educationalbackground');
INSERT INTO "django_content_type" VALUES (14,'portfolio','contact');
INSERT INTO "django_content_type" VALUES (15,'portfolio','award');
INSERT INTO "auth_permission" VALUES (1,1,'add_logentry','Can add log entry');
INSERT INTO "auth_permission" VALUES (2,1,'change_logentry','Can change log entry');
INSERT INTO "auth_permission" VALUES (3,1,'delete_logentry','Can delete log entry');
INSERT INTO "auth_permission" VALUES (4,1,'view_logentry','Can view log entry');
INSERT INTO "auth_permission" VALUES (5,2,'add_permission','Can add permission');
INSERT INTO "auth_permission" VALUES (6,2,'change_permission','Can change permission');
INSERT INTO "auth_permission" VALUES (7,2,'delete_permission','Can delete permission');
INSERT INTO "auth_permission" VALUES (8,2,'view_permission','Can view permission');
INSERT INTO "auth_permission" VALUES (9,3,'add_group','Can add group');
INSERT INTO "auth_permission" VALUES (10,3,'change_group','Can change group');
INSERT INTO "auth_permission" VALUES (11,3,'delete_group','Can delete group');
INSERT INTO "auth_permission" VALUES (12,3,'view_group','Can view group');
INSERT INTO "auth_permission" VALUES (13,4,'add_user','Can add user');
INSERT INTO "auth_permission" VALUES (14,4,'change_user','Can change user');
INSERT INTO "auth_permission" VALUES (15,4,'delete_user','Can delete user');
INSERT INTO "auth_permission" VALUES (16,4,'view_user','Can view user');
INSERT INTO "auth_permission" VALUES (17,5,'add_contenttype','Can add content type');
INSERT INTO "auth_permission" VALUES (18,5,'change_contenttype','Can change content type');
INSERT INTO "auth_permission" VALUES (19,5,'delete_contenttype','Can delete content type');
INSERT INTO "auth_permission" VALUES (20,5,'view_contenttype','Can view content type');
INSERT INTO "auth_permission" VALUES (21,6,'add_session','Can add session');
INSERT INTO "auth_permission" VALUES (22,6,'change_session','Can change session');
INSERT INTO "auth_permission" VALUES (23,6,'delete_session','Can delete session');
INSERT INTO "auth_permission" VALUES (24,6,'view_session','Can view session');
INSERT INTO "auth_permission" VALUES (25,7,'add_post','Can add post');
INSERT INTO "auth_permission" VALUES (26,7,'change_post','Can change post');
INSERT INTO "auth_permission" VALUES (27,7,'delete_post','Can delete post');
INSERT INTO "auth_permission" VALUES (28,7,'view_post','Can view post');
INSERT INTO "auth_permission" VALUES (29,8,'add_workexperience','Can add work experience');
INSERT INTO "auth_permission" VALUES (30,8,'change_workexperience','Can change work experience');
INSERT INTO "auth_permission" VALUES (31,8,'delete_workexperience','Can delete work experience');
INSERT INTO "auth_permission" VALUES (32,8,'view_workexperience','Can view work experience');
INSERT INTO "auth_permission" VALUES (33,9,'add_skill','Can add skill');
INSERT INTO "auth_permission" VALUES (34,9,'change_skill','Can change skill');
INSERT INTO "auth_permission" VALUES (35,9,'delete_skill','Can delete skill');
INSERT INTO "auth_permission" VALUES (36,9,'view_skill','Can view skill');
INSERT INTO "auth_permission" VALUES (37,10,'add_project','Can add project');
INSERT INTO "auth_permission" VALUES (38,10,'change_project','Can change project');
INSERT INTO "auth_permission" VALUES (39,10,'delete_project','Can delete project');
INSERT INTO "auth_permission" VALUES (40,10,'view_project','Can view project');
INSERT INTO "auth_permission" VALUES (41,11,'add_profile','Can add profile');
INSERT INTO "auth_permission" VALUES (42,11,'change_profile','Can change profile');
INSERT INTO "auth_permission" VALUES (43,11,'delete_profile','Can delete profile');
INSERT INTO "auth_permission" VALUES (44,11,'view_profile','Can view profile');
INSERT INTO "auth_permission" VALUES (45,12,'add_othercontact','Can add other contact');
INSERT INTO "auth_permission" VALUES (46,12,'change_othercontact','Can change other contact');
INSERT INTO "auth_permission" VALUES (47,12,'delete_othercontact','Can delete other contact');
INSERT INTO "auth_permission" VALUES (48,12,'view_othercontact','Can view other contact');
INSERT INTO "auth_permission" VALUES (49,13,'add_educationalbackground','Can add educational background');
INSERT INTO "auth_permission" VALUES (50,13,'change_educationalbackground','Can change educational background');
INSERT INTO "auth_permission" VALUES (51,13,'delete_educationalbackground','Can delete educational background');
INSERT INTO "auth_permission" VALUES (52,13,'view_educationalbackground','Can view educational background');
INSERT INTO "auth_permission" VALUES (53,14,'add_contact','Can add contact');
INSERT INTO "auth_permission" VALUES (54,14,'change_contact','Can change contact');
INSERT INTO "auth_permission" VALUES (55,14,'delete_contact','Can delete contact');
INSERT INTO "auth_permission" VALUES (56,14,'view_contact','Can view contact');
INSERT INTO "auth_permission" VALUES (57,15,'add_award','Can add award');
INSERT INTO "auth_permission" VALUES (58,15,'change_award','Can change award');
INSERT INTO "auth_permission" VALUES (59,15,'delete_award','Can delete award');
INSERT INTO "auth_permission" VALUES (60,15,'view_award','Can view award');
INSERT INTO "auth_user" VALUES (1,'pbkdf2_sha256$180000$o8Q421ynuvVr$KXSzwRFNYnbbtoH2jzi8lWFIxmYgYks1ivAuuKY4ws4=','2020-01-27 05:26:02.287088',1,'admin','','admin@sample.com',1,1,'2020-01-23 09:34:13.989699','');
INSERT INTO "auth_user" VALUES (2,'pbkdf2_sha256$180000$KTjmiRFC9ft8$zW4yyMiPV11EhWKWW9rU1O5klraY7i2EnbAWE0LTX0g=',NULL,0,'em','Emma','',0,1,'2020-01-23 09:38:03','Watson');
INSERT INTO "auth_user" VALUES (3,'pbkdf2_sha256$180000$TgPXwCMiHh4y$wc3h9NgGbSW3no+Q2caESBxdlNC85zux9WFzkywJHC4=',NULL,0,'chloe','Chloe Grace','',0,1,'2020-01-23 09:38:23','Moretz');
INSERT INTO "auth_user" VALUES (4,'pbkdf2_sha256$180000$0tC9A5tzXiiQ$XQsiM8bNNU/EPoD0BTYj+X/K0VMAsg0BYbQ/hiAJfa0=',NULL,0,'geralt','White','',0,1,'2020-01-23 09:38:50','Wolf');
INSERT INTO "blog_post" VALUES (1,'New Post','dfsafssg
dfgdfg
dfgdf','2020-01-23 09:46:19.525671','blogs/yokohama-japan_GcROTrM.jpg',3);
INSERT INTO "blog_post" VALUES (2,'2nd Post Title','updated','2020-01-23 09:46:29.845111','blogs/image_g4yB7zs.png',3);
INSERT INTO "blog_post" VALUES (3,'Hello Universe','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum','2020-01-23 09:49:17','blogs/Scholarship_of_Teaching_and_Learning_tcr1ofe.jpg',3);
INSERT INTO "blog_post" VALUES (4,'The Movie','fdgdfgdh
dhfgh','2020-01-24 01:21:52','blogs/g_ilSp9IP.jpg',2);
INSERT INTO "blog_post" VALUES (5,'The Witcher','#geraltOfRivia','2020-01-24 01:22:59.133790','blogs/photo-1512400930990-e0bc0bd809df_BnH1dwV.jpeg',4);
INSERT INTO "blog_post" VALUES (6,'Heeyyyyyy','','2020-01-24 01:23:39.428767','blogs/4-48486_latest-hd-nature-wallpaper-beautiful-background_gTxa22E.jpg',4);
INSERT INTO "blog_post" VALUES (7,'Today''s Post','','2020-01-24 01:48:07.648595','blogs/j7e4i_X3sw8A6.gif',3);
INSERT INTO "blog_post" VALUES (8,'Sample Post Title','fhfh
dfdf




fhfghfgh
fghgfh
fhf','2020-01-24 05:24:01.497988','blogs/g_J51njXn.jpg',3);
INSERT INTO "blog_post" VALUES (24,'Try','','2020-01-24 08:15:09.288223','blogs/admin.png',2);
INSERT INTO "portfolio_workexperience" VALUES (1,'Front-End Developer','Front End Developer Job Description. Front End Developers are computer programmers who specialize in website design. Front End Developer duties include determining the structure and design of web pages, striking a balance between functional and aesthetic design and ensuring web design is optimized for smartphones.','Andculture, Harrisburg, PA','Feb. 2013 – Feb. 2014',2);
INSERT INTO "portfolio_workexperience" VALUES (2,'Sample Job Title','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum','ABC Company Name','May 2014  – December 2015',3);
INSERT INTO "portfolio_workexperience" VALUES (4,'Web Developer / Graphic Designereveloper','A web designer/developer is responsible for the design, layout and coding of a website. They are involved with the technical and graphical aspects of a website; how the site works and how it looks. They can also be involved with the maintenance and update of an existing site.','XYZ Company, PA','Mar. 2008 – Feb. 2011',2);
INSERT INTO "portfolio_workexperience" VALUES (5,'Sample Job Title','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum','ABC Company Name','May 2014  – December 2015',3);
INSERT INTO "portfolio_workexperience" VALUES (6,'Cloud System Engineer','Cloud computing engineers define, design, build, and maintain systems and solutions leveraging systems and infrastructure managed by cloud providers such as Amazon Web Services (AWS) and Microsoft Azure. A cloud engineer is an IT professional responsible for any technological duties associated with cloud computing, including design, planning, management, maintenance and support. ... Additionally, cloud engineers must have a background building or designing Web services in the cloud.','LMN Company, Grindelwald, Switszerland','March 2016 – Present',3);
INSERT INTO "portfolio_workexperience" VALUES (8,'Sample Job Title','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum','ABC Company Name','May 2015  – Present',4);
INSERT INTO "portfolio_workexperience" VALUES (29,'Updated Job Title','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur','EFGH Holdings, Inc.','1999-01-14 – 2001',3);
INSERT INTO "portfolio_workexperience" VALUES (33,'Web Developer / Graphic Designer','A web designer/developer is responsible for the design, layout and coding of a website. They are involved with the technical and graphical aspects of a website; how the site works and how it looks. They can also be involved with the maintenance and update of an existing site.','XYZ Company, PA','Mar. 2008 – February 2011',3);
INSERT INTO "portfolio_workexperience" VALUES (35,'Lead Web Developer','* Identifying user and system requirements for new websites and applications.
* Prioritizing software development projects, setting timelines and assigning tasks to team members
* Creating wireframes to decide on layout.','ABC Advertising, Ben&Ben, PA','2011-01-08 – February 2013',3);
INSERT INTO "portfolio_skill" VALUES (1,'Eating','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure do','skills/internet_black.png',2);
INSERT INTO "portfolio_skill" VALUES (2,'Programming','Javascript (React JS), Python, Django','skills/admin.png',3);
INSERT INTO "portfolio_skill" VALUES (3,'Web Development','HTML & CSS','skills/j7e4i.gif',3);
INSERT INTO "portfolio_skill" VALUES (4,'Acting','Lorem ipsum dolor sit amet, consectetur','skills/g.jpg',3);
INSERT INTO "portfolio_project" VALUES (1,'Creative ABC Pages','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','projects/j7e4i_JNyXd6d.gif',3);
INSERT INTO "portfolio_project" VALUES (2,'Digital Landscape','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','projects/4-48486_latest-hd-nature-wallpaper-beautiful-background_1zsVCl3.jpg',3);
INSERT INTO "portfolio_project" VALUES (3,'Blah Sample Website','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.','projects/yokohama-japan_wkCMnBL.jpg',3);
INSERT INTO "portfolio_project" VALUES (4,'IoT Sample Project','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','projects/image.png',2);
INSERT INTO "portfolio_project" VALUES (5,'XYZ Application','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','',2);
INSERT INTO "portfolio_project" VALUES (6,'Handraiser Application','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','projects/Screenshot_from_2019-09-02_10-24-36_vNxZZmB.png',3);
INSERT INTO "portfolio_profile" VALUES (1,'profile_pics/chloe_bgn8hkd.jpg','I assist the development team with all aspects of software design and coding.


Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',3);
INSERT INTO "portfolio_profile" VALUES (2,'profile_pics/profile_woman_WDAeY45.png','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',2);
INSERT INTO "portfolio_profile" VALUES (3,'profile_pics/photo-1512400930990-e0bc0bd809df_HyVEL1k.jpeg','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',4);
INSERT INTO "portfolio_educationalbackground" VALUES (1,'Tabaco National High School','2011-2013','Secondary School','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',2);
INSERT INTO "portfolio_educationalbackground" VALUES (2,'Bicol University','2017-2019','College Degree','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',3);
INSERT INTO "portfolio_educationalbackground" VALUES (3,'Massachusetts Institute of Technology','2019-Present','Master''s Degree','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',3);
INSERT INTO "portfolio_educationalbackground" VALUES (4,'Philippine Science High School','2013-2015','Secondary Science Oriented School','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',3);
INSERT INTO "portfolio_educationalbackground" VALUES (6,'General Education and Vocational School','2005-2009','Vocational','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident''',3);
INSERT INTO "portfolio_award" VALUES (1,'Most Innovative Blah Blah','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut a','2020-01-27',4);
INSERT INTO "portfolio_award" VALUES (2,'''The Best Designs''','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut a','2020-01-27',3);
INSERT INTO "portfolio_award" VALUES (3,'CSS Design Awards','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut a','2020-01-27',3);
INSERT INTO "portfolio_award" VALUES (4,'Most Loved Site','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut a','2020-01-27',3);
INSERT INTO "django_session" VALUES ('795214i8merm5z7yqztq4anue6fjre52','YzYxZGZiNWNkZjVmMDhhZDZjMzFiYzM5ZjIyMmQyOWFiYWFiYWRmMTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJmM2RmZmM1ZGZjYTI5OTIxMjVhZjg2MzhmYzU1ZmE0ZDg3NjFiMzllIn0=','2020-02-07 01:19:36.617280');
INSERT INTO "django_session" VALUES ('xq915i5770r2xz891k0rp5uezthw8xj3','YzYxZGZiNWNkZjVmMDhhZDZjMzFiYzM5ZjIyMmQyOWFiYWFiYWRmMTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJmM2RmZmM1ZGZjYTI5OTIxMjVhZjg2MzhmYzU1ZmE0ZDg3NjFiMzllIn0=','2020-02-10 05:26:02.600016');
CREATE UNIQUE INDEX IF NOT EXISTS "auth_group_permissions_group_id_permission_id_0cd325b0_uniq" ON "auth_group_permissions" (
	"group_id",
	"permission_id"
);
CREATE INDEX IF NOT EXISTS "auth_group_permissions_group_id_b120cbf9" ON "auth_group_permissions" (
	"group_id"
);
CREATE INDEX IF NOT EXISTS "auth_group_permissions_permission_id_84c5c92e" ON "auth_group_permissions" (
	"permission_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "auth_user_groups_user_id_group_id_94350c0c_uniq" ON "auth_user_groups" (
	"user_id",
	"group_id"
);
CREATE INDEX IF NOT EXISTS "auth_user_groups_user_id_6a12ed8b" ON "auth_user_groups" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "auth_user_groups_group_id_97559544" ON "auth_user_groups" (
	"group_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "auth_user_user_permissions_user_id_permission_id_14a6b632_uniq" ON "auth_user_user_permissions" (
	"user_id",
	"permission_id"
);
CREATE INDEX IF NOT EXISTS "auth_user_user_permissions_user_id_a95ead1b" ON "auth_user_user_permissions" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "auth_user_user_permissions_permission_id_1fbb5f2c" ON "auth_user_user_permissions" (
	"permission_id"
);
CREATE INDEX IF NOT EXISTS "django_admin_log_content_type_id_c4bce8eb" ON "django_admin_log" (
	"content_type_id"
);
CREATE INDEX IF NOT EXISTS "django_admin_log_user_id_c564eba6" ON "django_admin_log" (
	"user_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "django_content_type_app_label_model_76bd3d3b_uniq" ON "django_content_type" (
	"app_label",
	"model"
);
CREATE UNIQUE INDEX IF NOT EXISTS "auth_permission_content_type_id_codename_01ab375a_uniq" ON "auth_permission" (
	"content_type_id",
	"codename"
);
CREATE INDEX IF NOT EXISTS "auth_permission_content_type_id_2f476e4b" ON "auth_permission" (
	"content_type_id"
);
CREATE INDEX IF NOT EXISTS "blog_post_user_id_710cc4d2" ON "blog_post" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "portfolio_workexperience_user_id_99e7d1fc" ON "portfolio_workexperience" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "portfolio_skill_user_id_361a9831" ON "portfolio_skill" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "portfolio_project_user_id_15df2bf9" ON "portfolio_project" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "portfolio_othercontact_profile_id_1ab47f14" ON "portfolio_othercontact" (
	"profile_id"
);
CREATE INDEX IF NOT EXISTS "portfolio_educationalbackground_user_id_50fecc88" ON "portfolio_educationalbackground" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "portfolio_contact_profile_id_1af83898" ON "portfolio_contact" (
	"profile_id"
);
CREATE INDEX IF NOT EXISTS "portfolio_award_user_id_39afdcb7" ON "portfolio_award" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "django_session_expire_date_a5c62663" ON "django_session" (
	"expire_date"
);
COMMIT;
