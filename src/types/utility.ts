// API Response Types based on OpenAPI specification

export interface IUser {
	firstName: string;
	lastName: string;
	username: string;
	password: string;
}

export interface IUserSafe {
	id: number;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	avatar: string;
	bio: string;
	theme: "system" | "light" | "dark";
	isAccountPrivate: boolean;
	isSigninAllowed: boolean;
}

export interface IFollowers {
	approved: boolean;
	createdAt: string;
    from: number;
    id: number;
    sender: IAccount;
    to: number;
    updateAt: string;
}

export interface IFollowing {
	approved: boolean;
	createdAt: string;
	from: number;
	id: number;
	receiver: IAccount;
	to: number;
	updateAt: string;
}

export interface IPost {
	id: number;
	title: string;
	description: string;
	image?: string;
	postImage?: string;
	createdAt: string;
	authorId: number;
	author?: IUserSafe;
	isLiked?: boolean;
	likesCount?: number;
}

export interface IComment {
	id: number;
	text: string;
	createdAt: string;
	authorId: number;
	postId: number;
	author?: IUserSafe;
	reactionsCount?: number;
}


export interface IAccount extends IUserSafe {
	posts: IPost[];
	followers: IFollowers[];
	followings: IFollowing[];
}

export interface IContext {
	user: IAccount;
	setAccount: React.Dispatch<React.SetStateAction<IAccount | null>>;
	refetch: () => Promise<void>;
}

// API Request Types
export interface ISignupRequest {
	firstName: string;
	lastName: string;
	username: string;
	password: string;
	email?: string;
}

export interface ISigninRequest {
	username: string;
	password: string;
}

export interface IUpdatePasswordRequest {
	currentPassword: string;
	newPassword: string;
}

export interface IUpdatePrivacyRequest {
	isAccountPrivate: boolean;
}

export interface IUpdateBioRequest {
	bio: string;
}

export interface ICreatePostRequest {
	title: string;
	description: string;
	image?: File;
}

// API Response Types
export interface IAuthResponse {
	token: string;
}

export interface IUserResponse {
	user: IAccount;
}

export interface IErrorResponse {
	message: string;
}

export interface IAvatarResponse {
	picture: string;
}

export interface IPostsResponse {
	posts: IPost[];
}

export interface IFollowRequestsResponse {
	requests: IFollowers[];
}

export interface ISearchResponse {
	users: IUserSafe[];
}
