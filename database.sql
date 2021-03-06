drop database ca;
create database ca;
use ca;

#table abstractfile
create table abstractfile (
	id int unique,
	path char(64) unique,			#path
	name char(24),					#filename
	primary key(id)
);

#table folder
create table folder (
	id int,
	parentfolder int,
	primary key(id),
	constraint folder_base_fk foreign key(id) references abstractfile(id) on delete cascade
	#constraint folder_parentfolder_fk foreign key(parentfolder) references folder(id) on delete cascade
);

#table file
create table file (
	id int,
	parentfolder int,
	primary key(id),
	constraint file_base_fk foreign key(id) references abstractfile(id) on delete cascade
	#constraint file_parentfolder_fk foreign key(parentfolder) references folder(id) on delete cascade
);

#table binaryfile
create table binaryfile (
	id int,
	data blob,
	primary key(id),
	constraint binary_file_base_fk foreign key(id) references file(id) on delete cascade
);	

#table textfile
create table textfile (
	id int,
	data blob,
	primary key(id),
	constraint text_file_base_fk foreign key(id) references file(id) on delete cascade
);

alter table folder add constraint folder_parentfolder_fk foreign key(parentfolder) references folder(id) on delete cascade;
alter table file add constraint file_parentfolder_fk foreign key(parentfolder) references folder(id) on delete cascade;

insert into abstractfile values (0, "/", NULL);
insert into folder values(0, NULL);

#table user
create table user (
	id int,
	username char(32),
	password char(32),
	email char(32),
	primary key(id)
);

#table sourcefile
create table sourcefile (
	id int,
	filename char(32),
	owner int,
	source blob,
	primary key(id),
	constraint owner_fk foreign key(owner) references user(id) on delete cascade
);

#table tag
create table tag (
	id int,
	tag char(32),
	file int,
	primary key(id),
	constraint file_fk foreign key(file) references sourcefile(id) on delete cascade
);