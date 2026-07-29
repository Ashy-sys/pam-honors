import Hero from "@/components/home/Hero";
import Countdown from "@/components/home/Countdown";
import StatsStrip from "@/components/home/StatsStrip";
import AboutTeaser from "@/components/home/AboutTeaser";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import NomineeSpotlight from "@/components/home/NomineeSpotlight";
import JudgesTeaser from "@/components/home/JudgesTeaser";
import VotingHowItWorks from "@/components/home/VotingHowItWorks";
import HallOfFameTeaser from "@/components/home/HallOfFameTeaser";
import SponsorsStrip from "@/components/home/SponsorsStrip";
import NewsTeaser from "@/components/home/NewsTeaser";

export default function Home() {
  return (
    <main>
      <Hero />
      <Countdown />
      <StatsStrip />
      <AboutTeaser />
      <FeaturedCategories />
      <NomineeSpotlight />
      <JudgesTeaser />
      <VotingHowItWorks />
      <HallOfFameTeaser />
      <SponsorsStrip />
      <NewsTeaser />
    </main>
  );
}