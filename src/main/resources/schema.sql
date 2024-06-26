-- create table player 
-- (
-- 	id bigint not null, 
-- 	game_id bigint not null,
-- 	name varchar(255) not null,
-- 	location varchar(255) not null,
-- 	primary key (id)
-- );

create table if not exists cards
(
--	id bigint not null,
	gameid      varchar(255) not null,
	
	plum         varchar(255),
    scarlet      varchar(255),
    mustard      varchar(255),
    peacock      varchar(255),
    green        varchar(255),
    white        varchar(255),
    
    poison         varchar(255),
    poker         varchar(255),
    icepick        varchar(255),
    shears       varchar(255),
    candlestick  varchar(255),
    revolver     varchar(255),
    
    study        varchar(255),
    hall         varchar(255),
    lounge       varchar(255),
    library      varchar(255),
    billiard     varchar(255),
    dining       varchar(255),
    conservatory varchar(255),
    ballroom     varchar(255),
    kitchen      varchar(255),
    
    suggested_suspect varchar(255),
    suggested_weapon  varchar(255),
    suggested_room    varchar(255),
    
    primary key (gameid)
);

create table if not exists position
(
	gameid varchar(255) not null,
	userid smallint not null,
	grid_row smallint not null,
	grid_col smallint not null,
	constraint positionid primary key (gameid, userid)
);

--create table if not exists positions
--(
--	    gameid varchar(255) not null,
--	
--  	   plumrow varchar(255),
--    scarletrow varchar(255),
--    mustardrow varchar(255),
--    peacockrow varchar(255),
--      greenrow varchar(255),
--      whiterow varchar(255),
--	   plumcol varchar(255),
--    scarletcol varchar(255),
--    mustardcol varchar(255),
--    peacockcol varchar(255),
--      greencol varchar(255),
--      whitecol varchar(255),
--      
--      primary key (gameid)
--);