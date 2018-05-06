
CREATE TABLE Business (
                ID int primary key auto_increment, 
                Name varchar(100) not null , 
                Picture varchar(100) not null ,
                Latitude varchar(25) not null,
                Longitude varchar(25) not null
                );

CREATE TABLE BUSI_FOOD (
                ID int primary key auto_increment ,
                BusinessID int ,
                FoodID int,
                price int,
                foreign key (BusinessID) references Business(ID),
                foreign key (FoodID) references FOOD(ID)
                );

CREATE TABLE FOOD (
                ID int primary key auto_increment , 
                Name varchar(100) not null 
                );        

CREATE TABLE FOOD__Tag (
                ID int primary key auto_increment ,
                FoodID int ,
                _TagID int,
                foreign key (FoodID) references FOOD(ID),
                foreign key (_TagID) references __Tag(ID)
                );

CREATE TABLE __Tag (
                ID int primary key auto_increment ,
                Tag int
                );     
                
                
                
                
CREATE TABLE BUSI_Type (
                ID int primary key auto_increment, 
                BusinessID int , 
                TypeID int ,
                foreign key (BusinessID) references Business(ID),
                foreign key (TypeID) references __Type(ID)
                ); 
                
CREATE TABLE __Type (
                ID int primary key auto_increment ,
                _Type varchar(100) not null
                );