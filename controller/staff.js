const conn = require("../db/conn");
const moment = require("moment");

const AddStaff = async (req, res) => {
    try {
        // res.send(req.body);
        const staff = req.body;

        empid = staff.empid;
        fname = staff.fname;
        gender = staff.gender;
        dname = staff.dname;
        email = staff.email;
        mobile = staff.mobile;
        dob = staff.dob;
        jdate = staff.jdate;
        city = staff.city;
        state = staff.state;
        address = staff.address;
        password = staff.password;
        deptid = staff.deptid;

        if (
            !empid ||
            !fname ||
            !gender ||
            !dname ||
            !email ||
            !mobile ||
            !dob ||
            !jdate ||
            !city ||
            !state ||
            !address ||
            !password ||
            !deptid
        ) {
            res.status(400).send({ message: "please provide all details" });
            return;
        }

        const insert = await conn.query(
            "insert into tblstaff values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
            [
                empid,
                fname,
                gender,
                dname,
                email,
                mobile,
                dob,
                jdate,
                city,
                state,
                address,
                password,
                deptid,
            ]
        );

        if (insert.rowCount <= 0) {
            res.status(400).send({ message: "unable to insert" });
            return;
        }
        res.send({ empid: staff.empid, inserted: true });
    } catch (err) {
        res.status(400).send({ err });
    }
};

const GetStaff = async (req, res) => {
    try {
        const data = await conn.query("select * from tblstaff");

        if (data.rowCount <= 0) {
            res.status(404).send({ message: "not found" });
            return;
        }
        res.send(data.rows);
    } catch (error) {
        return res.status(404).send({ error });
    }
};

const UpdateStaff = async (req, res) => {
    try {
        const staff = req.body;

        empid = staff.empid;
        fname = staff.fname;
        gender = staff.gender;
        dname = staff.dname;
        email = staff.email;
        mobile = staff.mobile;
        dob = staff.dob;
        jdate = staff.jdate;
        city = staff.city;
        state = staff.state;
        address = staff.address;
        password = staff.password;
        deptid = staff.deptid;

        const update = await conn.query(
            "update tblstaff set fname=$1,gender=$2,dname=$3,email=$4,mobile=$5,dob=$6,jdate=$7,city=$8,state=$9,address=$10,password=$11,deptid=$12 where empid=$13",
            [
                fname,
                gender,
                dname,
                email,
                mobile,
                dob,
                jdate,
                city,
                state,
                address,
                password,
                deptid,
                empid,
            ]
        );

        if (update.rowCount <= 0) {
            res.status(404).send({ message: "not found!" });
            return;
        }

        res.send({ empid: staff.empid, updated: true });
    } catch (error) {
        return res.status(404).send({ error });
    }
};

const DeleteStaff = async (req, res) => {
    try {
        const empid = req.params.id;

        const result = await conn.query("delete from tblstaff where empid=$1", [
            empid,
        ]);

        if (result.rowCount <= 0) {
            res.status(404).send({ message: "not found!" });
            return;
        }

        res.send({ empid, deleted: true });
    } catch (error) {
        return res.status(404).send({ error });
    }
};

const addLeave = async (req, res) => {
    try {
        const data = req.body;

        const addLeaveData = await conn.query(
            "insert into tblleave values($1)",
            [data.date]
        );

        if (addLeaveData.rowCount <= 0) {
            res.status(400).send({ error: "unable to insert" });
            return;
        }

        res.send({ added: true });
    } catch (error) {
        return res.status(400).send({ error });
    }
};

const getAllLeave = async (req, res) => {
    try {
        const leaveData = await conn.query("select * from tblleave");

        if (leaveData.rowCount <= 0) {
            res.status(404).send({ error: "not found!" });
            return;
        }

        const data = leaveData.rows;

        res.send(data);
    } catch (error) {
        res.status(400).send({ error });
    }
};

module.exports = {
    AddStaff,
    GetStaff,
    UpdateStaff,
    DeleteStaff,
    addLeave,
    getAllLeave,
};
