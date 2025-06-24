'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlusCircle, Wand2 } from 'lucide-react';

interface SuggestionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  suggestions: string[];
  onAddSuggestion: (suggestion: string) => void;
  onAddAll: () => void;
}

const SuggestionsDialog: React.FC<SuggestionsDialogProps> = ({
  isOpen,
  onClose,
  suggestions,
  onAddSuggestion,
  onAddAll,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Wand2 className="mr-2 h-5 w-5" />
            AI Suggestions
          </DialogTitle>
          <DialogDescription>
            Here are some ideas to add to your wheel. Click to add them.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-2 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-md bg-secondary">
              <span className="text-secondary-foreground">{suggestion}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onAddSuggestion(suggestion)}
                className="h-8 w-8"
              >
                <PlusCircle className="h-5 w-5 text-primary" />
              </Button>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onAddAll}>Add All & Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuggestionsDialog;
