"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controllers_1 = require("../controllers/auth.controllers");
const verifyToken_1 = require("../middleware/verifyToken");
const router = (0, express_1.Router)();
router.post('/singup', auth_controllers_1.singup);
router.post('/singin', auth_controllers_1.singin);
router.get('/profile', verifyToken_1.requireAuth, auth_controllers_1.profile);
exports.default = router;
//# sourceMappingURL=auth.js.map