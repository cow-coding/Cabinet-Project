// routes/index.js

module.exports = function (app, fs, crypto, User, Cabinet) {
  // Home API
  app.get("/", function (req, res) {
    var sess = req.session;

    console.log(sess);

    res.render("index", {
      name: sess.name,
      studentID: sess.studentID,
      floor: sess.floor,
      cabinets: undefined,
    });
  });

  // Login API
  app.post("/login", function (req, res) {
    const notUser =
      '<script type="text/javascript">alert("존재하지 않는 학생입니다."); window.location="/";</script>';
    var sess = req.session;
    var currID = req.body.studentID;
    var currName = req.body.name;

    User.findOne({ studentID: currID }, function (err, user) {
      if (err) {
        console.error(err);
        return;
      }

      if (!user) {
        // console.log("Not found");
        res.send(notUser);
      } else {
        console.log(
          `student id: ${user.studentID}, name: ${user.name}, isPay:${user.isPay}`
        );

        sess.studentID = user.studentID;
        sess.name = user.name;

        res.redirect("/");
      }
    });
  });

  // first floor cabinet API
  app.post("/first", function (req, res) {
    var sess = req.session;
    var currFloor = "first";
    sess.floor = 1;

    Cabinet.find({ floor: currFloor }, function (err, cabinets) {
      if (err) {
        return res.status(500).send({ error: "database failure" });
      }

      res.render("index", {
        cabinets: cabinets,
        name: sess.name,
        studentID: sess.studentID,
        floor: sess.floor,
      });
    });
  });

  // second floor cabinet API
  app.post("/second", function (req, res) {
    var sess = req.session;
    var currFloor = "second";
    sess.floor = 2;

    Cabinet.find({ floor: currFloor }, function (err, cabinets) {
      if (err) {
        return res.status(500).send({ error: "database failure" });
      }

      res.render("index", {
        cabinets: cabinets,
        name: sess.name,
        studentID: sess.studentID,
        floor: sess.floor,
      });
    });

    console.log("second");
    console.log(sess);
  });

  // ------------ please update this API --------------
  // apply the cabinet API
  app.post("/apply", function (req, res) {
    var currCabinet = Number(req.body.cabinetNum);
    var sess = req.session;
    var f;
    if (sess.floor == 1) {
      f = "first";
    } else {
      f = "second";
    }

    console.log(typeof currCabinet);

    console.log(sess, currCabinet);

    Cabinet.find(
      { floor: f, cabinetNumber: currCabinet },
      function (err, cabinets) {
        console.log(f);
        console.log(currCabinet);
        console.log(sess.studentID);
        console.log(cabinets.cabinetNumber);
      }
    );

    User.findOne({ studentID: sess.studentID }, function (err, user) {
      user.useCabinet = currCabinet;
      user.useFloor = sess.floor;
    });
  });

  // Logout API
  app.get("/logout", function (req, res) {
    sess = req.session;

    if (sess.studentID) {
      req.session.destroy(function (err) {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/");
        }
      });
    } else {
      res.redirect("/");
    }
  });

  // Create User API for testing user make
  app.post("/create/user", function (req, res) {
    var user = new User();
    user.studentID = req.body.studentID;
    user.name = req.body.name;
    user.isPay = req.body.isPay;

    user.save(function (err) {
      if (err) {
        console.error(err);
        res.json({ result: 0 });
        return;
      }

      res.json({ result: 1 });
    });
  });

  app.post("/cabinetinfo", function (req, res) {
    var f = req.body.floor;
    var n = req.body.num;

    Cabinet.find({ floor: f, cabinetNumber: n }, function (err, cabinets) {
      console.error(err);
      res.json(cabinets);
    });
  });

  // DB link test API
  app.get("/cabinetinfo/:floor", function (req, res) {
    var currFloor = req.params.floor;

    Cabinet.find({ floor: currFloor }, function (err, cabinets) {
      if (err) {
        return res.status(500).send({ error: "database failure" });
      }

      res.json(cabinets);
    });
  });
};
