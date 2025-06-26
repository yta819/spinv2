import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ListChecks, Palette, Cog, PlayCircle, Trophy } from "lucide-react";

export default function HowToSpinPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8 md:py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">How to Use WheelVerse</CardTitle>
          <CardDescription>A quick guide to get your wheel spinning.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ListChecks className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Step 1: Add Your Items</h3>
                <p className="text-muted-foreground">
                  On the right-hand panel, you'll find a text box labeled "Wheel Items". Type or paste the choices you want on the wheel. Make sure to put each item on a new line. You can add, remove, or shuffle the items using the buttons below the text box.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                <Cog className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Step 2: Customize Settings (Optional)</h3>
                <p className="text-muted-foreground">
                  Below the items list, you can adjust settings to your liking. You can change the spin duration, decide if the winner should be removed after a spin, and enable or disable sound effects.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                    <Palette className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Step 3: Change Appearance (Optional)</h3>
                    <p className="text-muted-foreground">
                    In the "Appearance" section, you can select from various color palettes to change the look of your wheel. Find the one that best suits your mood!
                    </p>
                </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <PlayCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Step 4: Spin the Wheel!</h3>
                <p className="text-muted-foreground">
                  Once your list is ready, click the big "SPIN!" button in the center of the wheel. Watch it go and build the anticipation!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/80 text-primary-foreground">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Step 5: Announce the Winner</h3>
                <p className="text-muted-foreground">
                  When the wheel stops, a dialog box will pop up, celebrating the winning item. From there, you can close the dialog and spin again!
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
