import multer from "multer";

const multerUpload = multer({
    limits: {
        fileSize: 5*1024*1024 // 5 MB
    }
});

const singleAvatar = multerUpload.single("avatar");
const attachmentsMulter = multerUpload.array("files",5);


export { singleAvatar,attachmentsMulter };