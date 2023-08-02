/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		API_URL: "http://localhost:3000",
	
		NEXTAUTH_SECRET: "bajbsajsjsa1232232111",
	
		NEXTAUTH_URL: "http://localhost:3000",
	
		CLOUD_NAME: "dlyoovaha",
		CLOUDINARY_API_KEY: "621888197357198",
		CLOUDINARY_API_SECRET: "ovs_RVZL5aDPiRlDvCYZgXyHaSA",
	
	
	
	  },
	  images: {
		domains: ["res.cloudinary.com", "lh3.googleusercontent.com"],
	  },
}

module.exports = nextConfig
