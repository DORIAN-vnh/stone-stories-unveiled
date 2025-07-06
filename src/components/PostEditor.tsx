
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Save, Eye } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface PostEditorProps {
  onSave: (post: any) => void;
}

const PostEditor = ({ onSave }: PostEditorProps) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: 'Administrator',
    status: 'draft' as 'draft' | 'published',
    category: '',
    tags: ''
  });

  const [isPreview, setIsPreview] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in title and content.",
        variant: "destructive"
      });
      return;
    }

    onSave({
      ...formData,
      createdAt: new Date().toISOString().split('T')[0],
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    });

    toast({
      title: "Post Saved",
      description: `Post has been saved as ${formData.status}.`,
    });

    // Reset form
    setFormData({
      title: '',
      content: '',
      author: 'Administrator',
      status: 'draft',
      category: '',
      tags: ''
    });
  };

  if (isPreview) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Preview</h3>
          <Button onClick={() => setIsPreview(false)} variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{formData.title || 'Untitled Post'}</CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline">{formData.category || 'Uncategorized'}</Badge>
              <Badge variant="secondary">{formData.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              {formData.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-3">{paragraph}</p>
              ))}
            </div>
            {formData.tags && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-stone-600 mb-2">Tags:</p>
                <div className="flex flex-wrap gap-1">
                  {formData.tags.split(',').map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Create Post</h3>
        <Button type="button" onClick={() => setIsPreview(true)} variant="outline">
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
      </div>

      <div>
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Enter post title"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="news">News</SelectItem>
              <SelectItem value="research">Research</SelectItem>
              <SelectItem value="discovery">Discovery</SelectItem>
              <SelectItem value="technique">Technique</SelectItem>
              <SelectItem value="history">History</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value: 'draft' | 'published') => setFormData(prev => ({ ...prev, status: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="content">Content *</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          placeholder="Write your post content here..."
          rows={8}
          required
        />
      </div>

      <div>
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
          placeholder="Separate tags with commas (e.g., marble, quarry, history)"
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1">
          <Save className="w-4 h-4 mr-2" />
          Save Post
        </Button>
      </div>
    </form>
  );
};

export default PostEditor;
