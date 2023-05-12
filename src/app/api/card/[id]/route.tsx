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

	const background = searchParams.get("bg");
	const xp = searchParams.get("xp");
	const requiredXp = searchParams.get("requiredXp");

	return new ImageResponse(
		<div
			style={{
				backgroundImage: `url(${background})`,
			}}
			tw="p-3 flex h-full w-full rounded-xl bg-gray-800 bg-cover bg-center bg-no-repeat"
		>
			<div tw="bg-gray-900/90 rounded-xl text-white h-full w-full flex items-center px-10">
				<div tw="flex items-center gap-4">
					<img
						src={user.data.avatarURL}
						tw="rounded-full border-4 border-sky-500 p-2 h-32 w-32"
						alt=""
					/>
					<div tw="flex flex-col space-y-3 ml-5 w-full">
						<div tw="flex items-center justify-between w-[70%]">
							<span tw="text-3xl font-bold">{user.data.username}</span>
							<span tw="text-xl">
								{xp}/{requiredXp}
							</span>
						</div>
						<div tw="flex">
							<div tw="h-7 w-[70%] bg-gray-700 absolute rounded-lg" />
							<div tw="h-7 w-[40%] bg-sky-500 rounded-lg" />
						</div>
					</div>
				</div>
			</div>
		</div>,
		{
			width: 900,
			height: 200,
			emoji: "fluentFlat",
		},
	);
}
