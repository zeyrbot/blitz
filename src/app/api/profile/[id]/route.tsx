import { JAPIUser } from "@/lib/types";
import { ImageResponse, NextRequest, NextResponse } from "next/server";

interface Params {
	params: {
		id: string;
	};
}

export async function GET(req: NextRequest, { params }: Params) {
	const { searchParams } = req.nextUrl;

	if (!params.id)
		return NextResponse.json({
			code: 400,
			context: "missing 'id' in params",
			message: "bad request",
		});

	const user = (await (
		await fetch(`https://japi.rest/discord/v1/user/${params.id}`)
	).json()) as JAPIUser;

	if (!user.data)
		return NextResponse.json({
			code: 400,
			context: "malformed id",
			message: "bad request",
		});

	const xp = searchParams.get("xp");
	const requiredXp = searchParams.get("requiredXp");

	return new ImageResponse(
		<div tw="flex bg-gray-900 flex-col gap-3 p-5 rounded-xl h-full w-full text-white">
			<div tw="flex justify-between items-center">
				<span tw="text-2xl">lvl 12</span>
				<span tw="text-2xl">TOP 4</span>
			</div>
			<div tw="flex items-center gap-4 mt-10">
				<img src={user.data.avatarURL} tw="rounded-xl h-32 w-32" alt="" />
				<div tw="flex flex-col space-y-3 ml-5 w-full">
					<div tw="flex items-center justify-between w-[75%]">
						<span tw="text-3xl font-bold">{user.data.username}</span>
						<span tw="text-xl">
							{xp}/{requiredXp}
						</span>
					</div>
					<div tw="flex">
						<div tw="h-9 w-[75%] bg-gray-800 absolute rounded-lg" />
						<div tw="h-9 w-[40%] bg-sky-500 rounded-lg" />
					</div>
				</div>
			</div>
		</div>,
		{
			width: 600,
			height: 600,
			emoji: "twemoji",
		},
	);
}
