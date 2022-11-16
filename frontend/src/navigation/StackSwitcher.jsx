import React from "react";
import { useSelector } from "react-redux";
import { TabStack } from "./TabStack";
import { OnboardingStack } from "./OnboardingStack";

export function StackSwitcher() {
  const user = useSelector((state) => state?.user);

  // for bottom tabs navigation
  return user?.userProfile ? <TabStack /> : <OnboardingStack />;
}
