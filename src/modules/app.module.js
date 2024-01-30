import { Router } from "express";
import user from "./user/user.module.js";
import brand from "./brand/brand.module.js";
import school from "./school/school.module.js";
import room from "./room/room.module.js";
import subject from "./subject/subject.module.js";
import userParent from "./user-parent/user-parent.module.js";
import lesson from "./lesson/lesson.module.js";
import group from "./group/group.module.js";
import teacherSubject from "./teacher-subject/teacherSubject.module.js";

const router = Router();

router.use("/user", user.router);
router.use("/brand", brand.router);
router.use("/school", school.router);
router.use("/room", room.router);
router.use("/subject", subject.router);
router.use("/user-parent", userParent.router);
router.use("/lesson", lesson.router);
router.use("/group", group.router);
router.use("/teacher-subject", teacherSubject.router);

export default { router };
