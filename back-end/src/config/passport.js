import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import db from '../models/index.model.js'; // Đường dẫn đến tệp Sequelize models
const User = db.User;
// Cấu hình JWT strategy
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Lấy token từ header Authorization
    secretOrKey: process.env.ACCESS_TOKEN_SECRET, // Khóa bí mật của bạn
};

// Tạo chiến lược
passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
        try {
            // Tìm người dùng trong cơ sở dữ liệu từ jwtPayload
            const user = await User.findByPk(jwtPayload.id);
            if (user) {
                return done(null, user); // Người dùng hợp lệ
            } else {
                return done(null, false); // Không tìm thấy người dùng
            }
        } catch (err) {
            return done(err, false); // Có lỗi trong quá trình tìm kiếm
        }
    })
);

export default passport;
