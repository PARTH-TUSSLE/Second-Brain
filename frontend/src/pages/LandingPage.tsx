import React from "react";
import PillNav from "../components/ui/PillNav";
import logo from "../icons/logo.svg";
import BlurText from "../components/BlurText";
import { InteractiveHoverButton } from "../components/ui/interactive-hover-button";
import Spline from "@splinetool/react-spline";

function LandingPage() {
  return (
    <div className="min-h-screen w-full relative">
      {/* Dark Horizon Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#121212",
        }}
      >
        <div className="w-screen h-20 flex justify-center">
          <PillNav
            items={[
              { label: "Home", href: "/" },
              { label: "SignUp", href: "/signup" },
              { label: "Services", href: "/services" },
              { label: "Contact", href: "/contact" },
            ]}
            activeHref="/"
            className="custom-nav"
            ease="power2.easeOut"
            baseColor="#000000"
            pillColor="#ffffff"
            hoveredPillTextColor="#ffffff"
            pillTextColor="#000000"
          />
        </div>

        <div className="flex">
          <div className="h-screen w-screen ">
            <div className="h-auto w-auto absolute top-52 left-48">
              <BlurText
                text="Isn't this so cool?!"
                delay={250}
                animateBy="words"
                direction="top"
                // onAnimationComplete={handleAnimationComplete}
                className="text-4xl ml-8 text-white"
              />
              <InteractiveHoverButton />
            </div>
          </div>
          <div className="h-screen w-screen bg-transparent">
            <Spline
              className="bg-transparent"
              scene="https://prod.spline.design/TsfFv96viNlwi0kX/scene.splinecode"
            />
          </div>
        </div>
      </div>

      {/* Your Content/Components */}
    </div>
  );
}

export default LandingPage;
