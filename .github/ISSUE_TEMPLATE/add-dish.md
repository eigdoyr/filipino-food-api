---
name: Add Dish
about: Submit a new Filipino dish to the dataset
title: "feat(data): add [dish name]"
labels: data
assignees: ""
---

## Dish Details

**Name:**
**Local Name (if different):**
**Origin Region (only if genuinely regional):**

## JSON Entry

```json
{
  "id": "",
  "name": "",
  "description": "",
  "type": [],
  "main_ingredients": [],
  "occasion": [],
  "flavor_profile": [],
  "cooking_method": [],
  "tags": []
}
```

## Checklist

- [ ] ID is a lowercase slug (e.g. `kare-kare`)
- [ ] Description is between 20 and 300 characters
- [ ] All enum values match the schema
- [ ] `main_ingredients` has 1–5 items only
- [ ] `origin_region` is only set if the dish genuinely originates from that region
- [ ] Ran `npm run validate` and it passes
