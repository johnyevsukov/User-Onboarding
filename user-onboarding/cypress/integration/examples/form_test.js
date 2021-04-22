describe("User Onboarding App", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });

    const nameInput = () => cy.get('input[name="name"]');
    const emailInput = () => cy.get('input[name="email"]');
    const passwordInput = () => cy.get('input[name="password"]');
    const checkbox = () => cy.get('input[name="termsOfService"]');
    const submitButton = () => cy.get('button')

    it("sanity test to make sure tests work", () => {
        expect(1 + 2).to.equal(3);
        expect(2 + 2).not.to.equal(5);
        expect({}).not.to.equal({}); // not strict (==)
        expect({}).to.eql({}); // strict (===)
      });

      it("check the inputs", () => {
          nameInput()
          .should("have.value", "")
          .type("John Yevsukov")
          .should("have.value", "John Yevsukov")
          emailInput()
          .should("have.value", "")
          .type("john@john.com")
          .should("have.value", "john@john.com")
          passwordInput()
          .should("have.value", "")
          .type("password")
          .should("have.value", "password")
      });

      it("check terms of service checkbox", () => {
          checkbox().check()
          checkbox().check()
      })

      it("check for the ability to submit", () => {
        cy.contains("John Yevsukov").should("not.exist");
        cy.contains("Email: john@john.com").should("not.exist");
        cy.contains("Password: password").should("not.exist");
        nameInput()
        .should("have.value", "")
        .type("John Yevsukov")
        .should("have.value", "John Yevsukov")
        emailInput()
        .should("have.value", "")
        .type("john@john.com")
        .should("have.value", "john@john.com")
        passwordInput()
        .should("have.value", "")
        .type("password")
        .should("have.value", "password")
        checkbox()
        .check()
        submitButton().click()
        cy.contains("John Yevsukov").should("exist");
        cy.contains("Email: john@john.com").should("exist");
        cy.contains("Password: password").should("exist");
    });

    it("check for the inability to submit when leaving an input blank", () => {
        nameInput()
        .should("have.value", "")
        .type("Bob Bob")
        .should("have.value", "Bob Bob")
        emailInput()
        .should("have.value", "")
        .type("bob@bob.com")
        .should("have.value", "bob@bob.com")
        checkbox()
        .check()
        submitButton().should("be.disabled")
    });
});