it("writes an entry without formatting", () => {
  cy.login("staging_jimmy");

  cy.location("pathname").should("include", "/entry/edit");

  const entryText = "Posted an update at " + new Date().toISOString();

  cy.get(".editor-content").type(entryText);
  cy.get("form").submit();

  cy.location("pathname").should("include", "/staging_jimmy/");

  cy.get(".journal-body").should("contain", entryText);
});

it("writes an entry with every type of formatting", () => {
  cy.login("staging_jimmy");

  cy.location("pathname").should("include", "/entry/edit");

  cy.get(".btn-h1 .btn").click();
  cy.get(".editor-content").type("Project A{enter}");

  cy.get(".btn-h2 .btn").click();
  cy.get(".editor-content").type("Subproject B{enter}");

  cy.get(".btn-h3 .btn").click();
  cy.get(".editor-content").type("Topic 1{enter}");

  cy.get(".editor-content").type("This week was ");
  cy.get(".btn-bold .btn").click();
  cy.get(".editor-content").type("{ctrl}{end}{ctrl}very difficult");
  cy.get(".btn-bold .btn").click();
  cy.get(".editor-content").type("!");
  cy.get(".editor-content").type("{enter}");

  cy.get(".editor-content").type("I ");
  cy.get(".btn-italic .btn").click();
  cy.get(".editor-content").type("discovered ");
  cy.get(".btn-italic .btn").click();
  cy.get(".btn-strikethrough .btn").click();
  cy.get(".editor-content").type("12");
  cy.get(".btn-strikethrough .btn").click();
  cy.get(".editor-content").type(" 21 new bugs.{enter}");

  // TODO: use link

  cy.get(".editor-content").type("Most were in the ");
  cy.get(".btn-inline-code .btn").click();
  cy.get(".editor-content").type("Frombobulator");
  cy.get(".btn-inline-code .btn").click();
  cy.get(".editor-content").type(
    "component. The typical bad code looks like this:{enter}"
  );

  // TODO: use code block
  // TODO: use bulleted list
  // TODO: use ordered list
  // TODO: use blockquote

  cy.get("form").submit();

  cy.location("pathname").should("include", "/staging_jimmy/");

  // TODO: Check rendered text
});




it("does not inject HTML comments", () => {
  cy.login("staging_jimmy");

  cy.location("pathname").should("include", "/entry/edit");

  cy.get(".btn-bulleted-list .btn").click();
  cy.get(".editor-content").type("a{enter}{enter}b");

  cy.get(".switch-mode .btn").click();

  cy.get(".editor-textarea").should(
    "have.value",
    "- a\n\nb"
  );
});
