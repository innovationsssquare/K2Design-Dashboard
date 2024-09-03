import React from 'react'

const Addsubcategory = () => {
  return (
    <div> <Card x-chunk="dashboard-07-chunk-0">
    <CardHeader>
      <CardTitle>Add Subcategory</CardTitle>
      <CardDescription>
        Lipsum dolor sit amet, consectetur adipiscing elit
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-6 w-full ">
        <div className="grid gap-3 ">
          <Label htmlFor="name">Select Category</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="picture">Category image</Label>
          <Input id="picture" type="file" />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
            className="min-h-24"
          />
        </div>
        <div className="grid gap-3">
          <Button>Add Category</Button>
        </div>
      </div>
    </CardContent>
  </Card></div>
  )
}

export default Addsubcategory