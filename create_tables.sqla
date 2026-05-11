-- 创建来源表
CREATE TABLE source (
    id INTEGER PRIMARY KEY,
    source TEXT DEFAULT NULL
);

-- 创建人员信息表
CREATE TABLE person (
    id TEXT DEFAULT NULL,
    name TEXT DEFAULT NULL,
    receiver TEXT DEFAULT NULL,
    nickname TEXT DEFAULT NULL,
    phone TEXT DEFAULT NULL,
    address TEXT DEFAULT NULL,
    car TEXT DEFAULT NULL,
    email TEXT DEFAULT NULL,
    qq INTEGER DEFAULT NULL,
    weibo INTEGER DEFAULT NULL,
    contact TEXT DEFAULT NULL,
    company TEXT DEFAULT NULL,
    source_id INTEGER DEFAULT 0,

    FOREIGN KEY (source_id) REFERENCES source(id)
);
