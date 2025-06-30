import type { Metadata } from 'next';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Spin The Wheel',
  description: 'Find answers to common questions about the Spin The Wheel app, including saving lists, item limits, and how the AI suggestions work.',
  keywords: ['faq', 'spin the wheel questions', 'help', 'support', 'list saving', 'ai suggestions', 'wheel settings'],
};

export default function FaqPage() {
    return (
        <div className="container mx-auto max-w-4xl py-8 md:py-12">
            <Card>
                <CardHeader>
                    <h1 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h1>
                    <CardDescription>
                        Have questions? We've got answers.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Can I save my list of items?</AccordionTrigger>
                            <AccordionContent>
                                Yes! Your list and settings are automatically saved in your browser's local storage. They are also encoded in the URL, so you can share a link to your specific wheel with others. Just copy the URL from your address bar.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Is there a limit to how many items I can add?</AccordionTrigger>
                            <AccordionContent>
                                There is no strict limit, but for the best visual experience and readability, we recommend between 2 and 20 items. More than that can make the text on the wheel slices very small.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>How does the "Remove winner after spin" setting work?</AccordionTrigger>
                            <AccordionContent>
                                When this option is enabled in the settings, the winning item will be automatically removed from your list after the spin is complete. This is useful for elimination-style draws where you don't want the same item to win twice.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>What is the "AI Suggest" feature?</AccordionTrigger>
                            <AccordionContent>
                                The "AI Suggest" button uses a generative AI model to come up with new ideas for your list. It looks at the items you've already entered and suggests related items to add, helping you brainstorm and expand your choices.
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="item-5">
                            <AccordionTrigger>Can I use this on my phone?</AccordionTrigger>
                            <AccordionContent>
                                Absolutely! Spin The Wheel is designed to be fully responsive and works great on desktops, tablets, and mobile phones. The layout will adapt to fit your screen size.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
}
