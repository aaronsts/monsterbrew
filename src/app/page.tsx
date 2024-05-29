import About from "@/components/homepage/About";
import Features from "@/components/homepage/Features";
import Hero from "@/components/homepage/Hero";
import SpecialThanks from "@/components/homepage/special-thanks";

export default function Home() {
	return (
		<div>
			<Hero />
			<About />
			<Features />
			<SpecialThanks />
		</div>
	);
}
