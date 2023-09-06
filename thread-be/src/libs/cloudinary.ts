import { v2 as cloudinary } from "cloudinary"

function cloudinaryConfig() {
    cloudinary.config({
        cloud_name: "dlkgkipax",
        api_key: "371515624215563",
        api_secret: "2brsnHMo64nR2G7AMw133GDij-k",
    })

    return cloudinaryConfig
}

export default cloudinaryConfig()