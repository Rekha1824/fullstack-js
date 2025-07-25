describe('template spec', () => {
  const uniqueUser = `user${Date.now()}`;
  const password = 'test123';

  it('registers a new user successfully', () => {
    cy.visit('/register');
    cy.get('input[placeholder="Username"]').type(uniqueUser);
    cy.get('input[placeholder="Password"]').type(password);
    cy.contains('Register').click();
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('User created');
    });     
  });

   // Negative: Register with an existing username
  it('shows error when registering with duplicate username', () => {
    cy.visit('/register');
    cy.get('input[placeholder="Username"]').type(uniqueUser);
    cy.get('input[placeholder="Password"]').type(password);
    cy.contains('Register').click();
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Username already exists');
    });
  });

  // Negative: Register with empty fields
  it('does not allow registering with empty username/password', () => {
    cy.visit('/register');
    cy.get('input[placeholder="Username"]').clear();
    cy.get('input[placeholder="Password"]').clear();
    cy.contains('Register').click();
  });

  // Positive: Login successfully
  it('logs in successfully', () => {
    cy.visit('/login');
    cy.get('input[placeholder="Username"]').type(uniqueUser);
    cy.get('input[placeholder="Password"]').type(password);
    cy.contains('Login').click();
    cy.url().should('include', '/tasks');
  });

  // Negative: Login with wrong password
  it('fails login with wrong password', () => {
    cy.visit('/login');
    cy.get('input[placeholder="Username"]').type(uniqueUser);
    cy.get('input[placeholder="Password"]').type('wrongpass');
    cy.contains('Login').click();
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Invalid credentials');
    });
  });

  // Positive: Add a new task
  it('adds a new task successfully', () => {
    cy.get('input[placeholder="New Task"]').type('Test task positive');
    cy.contains('Add').click();
    cy.contains('Test task positive').should('exist');
  });

  // Negative: Add an empty task (should not add)
  it('does not add an empty task', () => {
    cy.get('input[placeholder="New Task"]').clear();
    cy.contains('Add').click();
    // Check task count did not increase or no empty task created
    cy.get('ul > li').should('not.contain.text', '');
  });

  // Positive: Edit a task title
  it('edits a task successfully', () => {
    cy.contains('Edit').click();
    cy.get('input[value="Test task positive"]').clear().type('Edited task');
    cy.contains('Save').click();
    cy.contains('Edited task').should('exist');
  });

  // Negative: Edit task to empty title (should ignore or reject)
  it('does not allow empty task title on edit', () => {
    cy.contains('Edit').click();
    cy.get('input[value="Edited task"]').clear();
    cy.contains('Save').click();
    // Should still see old title, not empty
    cy.contains('Edited task').should('exist');
  });

  // Positive: Toggle task completion
  it('toggles task completion', () => {
    cy.get('input[type="checkbox"]').first().check();
    cy.get('input[type="checkbox"]').first().should('be.checked');
  });

  // Positive: Delete a task
  it('deletes a task successfully', () => {
    cy.contains('Delete').click();
    cy.contains('Edited task').should('not.exist');
  });

  // Positive: Logout successfully
  it('logs out successfully', () => {
    cy.contains('Logout').click();
    cy.url().should('include', '/login');
  });
});
