export interface JAPIError {
	error: string;
}

export interface JAPIUser {
	cache_expiry: number;
	cached: boolean;
	data: User;
}

export interface User {
	id: string;
	username: string;
	avatar: string;
	discriminator: string;
	public_flags: number;
	banner: string;
	banner_color: string;
	accent_color: number;
	tag: string;
	createdAt: string;
	createdTimestamp: number;
	public_flags_array: string[];
	defaultAvatarURL: string;
	avatarURL: string;
	bannerURL: string;
}
