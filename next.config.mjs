/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
		serverComponentsExternalPackages: ["@node-rs/argon2"]
	},
	images:{
		remotePatterns:[
			{
				protocol:"https",
				hostname:"png.pngtree.com",
			}
		]
	}
};

export default nextConfig;
