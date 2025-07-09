import type { Metadata } from 'next';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Spin The Wheel',
  description: 'Find answers to common questions about the Spin The Wheel app, including saving lists, item limits, how the AI suggestions work, and data privacy.',
  keywords: ['faq', 'spin the wheel questions', 'help', 'support', 'list saving', 'ai suggestions', 'wheel settings', 'privacy', 'Spin the Wheel', 'Wheel of name', 'Random name picker'],
};

export default function FaqPage() {
    return (
        <div className="container mx-auto max-w-4xl py-8 md:py-12">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold tracking-tight">Frequently Asked Questions</CardTitle>
                    <CardDescription>
                        Have questions? We've got answers. Here are some of the most common inquiries we receive about our random name picker.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>How is the winning item selected? Is it truly random?</AccordionTrigger>
                            <AccordionContent>
                                Yes, the winner selection is designed to be as random as possible. When you click "SPIN!", the wheel is given a random amount of spinning force. This, combined with the physics of the animation, ensures that the outcome is unpredictable and fair for all items on the wheel.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Is there a limit to how many items I can add to the wheel?</AccordionTrigger>
                            <AccordionContent>
                                While there is no technical limit to the number of items you can add, we recommend keeping the list between 2 and 50 items for the best user experience. With too many items, the text on each slice of the wheel can become very small and difficult to read.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                             <AccordionTrigger>Can I save my list of items for later?</AccordionTrigger>
                            <AccordionContent>
                                Absolutely! Your list of items and your customized settings are automatically saved in your browser's local storage. This means the next time you visit on the same device and browser, your setup will be just as you left it. Additionally, all your items and settings are encoded into the URL, so you can bookmark it or share the link to preserve a specific wheel.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>What is the "AI Suggest" feature and how does it work?</AccordionTrigger>
                            <AccordionContent>
                                The "AI Suggest" button is a powerful brainstorming tool. It uses a generative AI model to analyze the items you've already entered. Based on that context, it generates a list of new, related ideas that you might want to add to your wheel. It's perfect for when you're running out of ideas or want to add some creative new options.
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="item-5">
                            <AccordionTrigger>Is my data and the lists I create private?</AccordionTrigger>
                            <AccordionContent>
                                Yes, your privacy is a priority. All data, including your list of items and settings, is stored exclusively on your own device in your browser's local storage or encoded directly in the URL you see. No list data is ever sent to or stored on our servers. When you use the "AI Suggest" feature, only the existing list items are sent to the AI model to generate suggestions; this data is not stored or used for any other purpose.
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="item-6">
                            <AccordionTrigger>Can I use this app on my phone or tablet?</AccordionTrigger>
                            <AccordionContent>
                                Yes! Spin The Wheel is fully responsive, meaning it is designed to work beautifully across all devices, including desktops, laptops, tablets, and mobile phones. The layout automatically adapts to your screen size to provide the best possible experience.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
}
