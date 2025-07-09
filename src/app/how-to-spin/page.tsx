import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { ListChecks, Palette, Cog, PlayCircle, Trophy, Share2 } from "lucide-react";

export const metadata: Metadata = {
  title: 'How to Use Spin The Wheel',
  description: 'A step-by-step guide on how to add items, customize settings, and spin the wheel to get your random winner. Learn how to create the perfect random name picker.',
  keywords: ['how to use', 'guide', 'tutorial', 'instructions', 'spin the wheel help', 'add items', 'customize wheel', 'get winner', 'Spin the Wheel', 'Wheel of name', 'Random name picker'],
};

export default function HowToSpinPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8 md:py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">How to Use Spin The Wheel</CardTitle>
          <CardDescription>Follow these simple steps to create, customize, and spin your own wheel for any occasion. It's the perfect tool for making decisions fun and easy!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ListChecks className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Step 1: Add Your Items</h3>
                <p className="text-muted-foreground">
                  Begin by populating your wheel. In the "Wheel Items" panel on the right, you'll find a text box. Type or paste the names, tasks, prizes, or any choices you want on the wheel. Please ensure you place each item on a new line. The wheel will automatically update as you type. You can also use the "Shuffle", "Clear", and "Undo" buttons to manage your list easily.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                <Cog className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Step 2: Customize Settings</h3>
                <p className="text-muted-foreground">
                  Tailor the wheel's behavior to your needs in the "Settings" section. You can adjust the spin duration from a quick 2-second spin to a more suspenseful 15-second one. You can also toggle sound effects on or off for a quieter experience. These settings are automatically saved for your next visit.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                    <Palette className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Step 3: Change the Appearance</h3>
                    <p className="text-muted-foreground">
                    Personalize your wheel's look in the "Appearance" section. Choose from several color palettes like Default, Vintage, Neon, or Pastel to match the theme of your event or simply your preference. Your chosen look is saved in the URL, so it will be the same when you share it.
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
                  With your items and settings ready, it's time for the main event! Click the large "SPIN!" button in the center of the wheel. The wheel will accelerate and then slowly come to a stop, with the pointer indicating the winner.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/80 text-primary-foreground">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Step 5: See the Winner</h3>
                <p className="text-muted-foreground">
                  Once the wheel stops, a dialog box will pop up, triumphantly announcing the winner with a confetti celebration. From this dialog, you can choose to simply close it and spin again, or you can remove the winner from the list for elimination-style games.
                </p>
              </div>
            </div>

             <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/80 text-accent-foreground">
                <Share2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Step 6: Share Your Wheel</h3>
                <p className="text-muted-foreground">
                  Want to share your custom wheel with friends, colleagues, or followers? Use the "Share" button at the top-right of the wheel. This copies a unique link to your clipboard. Anyone with the link will see your exact list of items and appearance settings, making it perfect for remote participation.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
