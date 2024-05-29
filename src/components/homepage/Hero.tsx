import Image from "next/image";
import heroImage from "../../assets/hero-image.svg";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Hero() {
	return (
		<div className="flex items-center flex-col md:flex-row justify-between py-12 gap-12">
			<div className="w-1/2">
				<Image
					src={heroImage}
					width={heroImage.width}
					height={heroImage.height}
					alt="Illustration of a dice set with a D20, D4 and D6"
				/>
			</div>
			<div className="flex items-center text-center md:text-left md:items-start flex-col gap-3">
				<h1 className="font-yatra capitalize">
					Unique creatures <br /> for your D&D adventures
				</h1>
				<p className="font-short max-w-lg pb-3">
					Start from scratch or select a preset creature and bring it to{" "}
					<span className="font-bold">life.</span>
				</p>
				<div className="flex gap-2">
					<Link href="/editor" passHref legacyBehavior>
						<Button variant="primary" className="w-fit" size="lg">
							Start Creating
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
