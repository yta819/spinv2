'use client';

import React from 'react';
import type { WheelSettings } from '@/hooks/use-wheel-state';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Shuffle, Trash2, Undo, Wand2, Monitor, Moon, Sun, Palette, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface ControlsProps {
  text: string;
  settings: WheelSettings;
  onTextChange: (text: string) => void;
  onSettingsChange: (settings: Partial<WheelSettings>) => void;
  onShuffle: () => void;
  onClear: () => void;
  onUndo: () => void;
  onGetSuggestions: () => void;
  isSuggestionsLoading: boolean;
  isUndoable: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  text,
  settings,
  onTextChange,
  onSettingsChange,
  onShuffle,
  onClear,
  onUndo,
  onGetSuggestions,
  isSuggestionsLoading,
  isUndoable,
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Wheel Items</CardTitle>
          <CardDescription>Enter one item per line.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            rows={10}
            placeholder="Enter items here..."
            className="resize-none"
          />
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={onShuffle} variant="secondary">
              <Shuffle className="mr-2 h-4 w-4" /> Shuffle
            </Button>
            <Button onClick={onClear} variant="secondary">
              <Trash2 className="mr-2 h-4 w-4" /> Clear
            </Button>
            <Button onClick={onUndo} disabled={!isUndoable} variant="secondary">
              <Undo className="mr-2 h-4 w-4" /> Undo
            </Button>
            <Button onClick={onGetSuggestions} disabled={isSuggestionsLoading} variant="secondary">
              <Wand2 className="mr-2 h-4 w-4" /> {isSuggestionsLoading ? 'Thinking...' : 'AI Suggest'}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Settings className="mr-2"/>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
                <Label htmlFor="sound-enabled">Sound effects</Label>
                <Switch
                  id="sound-enabled"
                  checked={settings.soundEnabled}
                  onCheckedChange={(checked) => onSettingsChange({ soundEnabled: checked })}
                />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="spin-duration">Spin duration</Label>
              <Select
                value={String(settings.spinDuration)}
                onValueChange={(value) => onSettingsChange({ spinDuration: Number(value) })}
              >
                <SelectTrigger id="spin-duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">Short (2s)</SelectItem>
                  <SelectItem value="5">Normal (5s)</SelectItem>
                  <SelectItem value="10">Long (10s)</SelectItem>
                  <SelectItem value="15">Extra Long (15s)</SelectItem>
                </SelectContent>
              </Select>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Palette className="mr-2"/>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="color-palette">Color Palette</Label>
            <Select
              value={settings.colorPalette}
              onValueChange={(value) => onSettingsChange({ colorPalette: value })}
            >
              <SelectTrigger id="color-palette">
                <SelectValue placeholder="Select palette" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="vintage">Vintage</SelectItem>
                <SelectItem value="neon">Neon</SelectItem>
                <SelectItem value="pastel">Pastel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default Controls;
