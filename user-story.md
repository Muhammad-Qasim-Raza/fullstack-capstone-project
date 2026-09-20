# GiftLink User Stories

## User Story 1 — Browse Gifts

### User Story

As a visitor, I need to browse available household items so that I can find reusable items that meet my needs.

### Details and Assumptions

- Visitors can access the gifts listing without logging in.
- Only available gifts should be displayed.
- Each gift should show basic information such as title, category, description, and location.

### Acceptance Criteria

- Given that I am a visitor,
- When I open the gifts page,
- Then I should see a list of available household items.

---

## User Story 2 — Search Gifts

### User Story

As a visitor, I need to search for gifts by keyword or category so that I can quickly find relevant items.

### Details and Assumptions

- The search should support keywords.
- The search should support category-based filtering.
- Matching items should be displayed to the user.

### Acceptance Criteria

- Given that I am viewing the gifts,
- When I enter a keyword or select a category,
- Then I should see the items that match my search criteria.

---

## User Story 3 — View Item Details

### User Story

As a visitor, I need to view an item's details so that I can decide whether the item is useful to me.

### Details and Assumptions

- Each gift has a unique ID.
- The details page displays the item's title, category, description, location, and availability.

### Acceptance Criteria

- Given that I am viewing the gifts list,
- When I select an item,
- Then I should see the complete details of that item.

---

## User Story 4 — Register

### User Story

As a new user, I need to register an account so that I can use authenticated features of GiftLink.

### Details and Assumptions

- The user must provide the required registration information.
- The email address should be associated with the user account.
- Successful registration should return an authentication token.

### Acceptance Criteria

- Given that I am a new user,
- When I submit valid registration information,
- Then my account should be created and I should receive an authentication token.

---

## User Story 5 — Login

### User Story

As a registered user, I need to log in securely so that I can access my account and protected features.

### Details and Assumptions

- The user must provide valid credentials.
- Invalid credentials should not authenticate the user.
- Successful login should return an authentication token.

### Acceptance Criteria

- Given that I have a registered account,
- When I submit valid login credentials,
- Then I should be authenticated and receive an authentication token.

---

## User Story 6 — Profile

### User Story

As a user, I need to access my profile so that I can view and manage my account information.

### Details and Assumptions

- The profile is available to authenticated users.
- Authentication is required to access protected profile information.

### Acceptance Criteria

- Given that I am logged in,
- When I open my profile,
- Then I should see my account information.

---

## User Story 7 — Comments

### User Story

As a logged-in user, I need to comment on gifts so that I can communicate with the GiftLink community.

### Details and Assumptions

- Only authenticated users can add comments.
- Comments are associated with the selected gift.
- Unauthorized users should not be allowed to add comments.

### Acceptance Criteria

- Given that I am logged in and viewing a gift,
- When I submit a valid comment,
- Then the comment should be associated with that gift and displayed to users.

---

## User Story 8 — API Security

### User Story

As the project owner, I need JWT-protected APIs so that unauthorized users cannot modify protected data.

### Details and Assumptions

- Protected API routes require a valid JWT.
- Requests without valid authentication should be rejected.
- Public routes can remain accessible without authentication.

### Acceptance Criteria

- Given that an API endpoint requires authentication,
- When an unauthenticated user attempts to access the protected endpoint,
- Then the request should be rejected.
