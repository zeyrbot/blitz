import { ImageResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);

	const avatar = searchParams.get("avatar");
	const background = searchParams.get("bg");
	const username = searchParams.get("username");
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
						src={avatar as string}
						tw="rounded-full border-4 border-sky-500 p-2 h-32 w-32"
						alt=""
					/>
					<div tw="flex flex-col space-y-3 ml-5 w-full">
						<div tw="flex items-center justify-between w-[70%]">
							<span tw="text-3xl font-bold">{username}</span>
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
