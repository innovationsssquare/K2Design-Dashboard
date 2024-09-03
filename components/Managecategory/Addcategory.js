import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Textarea } from "@/components/ui/textarea";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Button } from "@/components/ui/button";

const Addcategory = () => {
  return (
    <div>
      {" "}
      <Card x-chunk="dashboard-07-chunk-0">
        <CardHeader>
          <CardTitle>Add Category</CardTitle>
          <CardDescription>
            Lipsum dolor sit amet, consectetur adipiscing elit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Category Name</Label>
              <Input id="name" type="text" className="w-full" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="picture">Category image</Label>
              <Input id="picture" type="file" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" className="min-h-24" />
            </div>
            <div className="grid gap-3">
              <Button>Add Category</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Addcategory;
