describe("Creacion de un plan", () => {
  it("crea un plan correctamente", () => {
    cy.intercept("POST", "**/plans", (request) => {
      expect(request.body).to.deep.include({
        name: "Tarde de paddle surf",
        description: "Una tarde remando por la bahia.",
        estimatedPrice: 65000,
        estimatedTime: 150,
        recomendations: "Llevar protector solar",
        address: "Bahia de las Brisas",
        image: "https://picsum.photos/seed/paddle/1200/700",
        userId: "user-1",
      });

      request.reply({
        statusCode: 201,
        body: { id: "plan-1" },
      });
    }).as("createPlan");

    cy.intercept("GET", "**/plans", {
      statusCode: 200,
      body: [
        {
          id: "plan-1",
          name: "Tarde de paddle surf",
          likes: 0,
          estimatedPrice: 65000,
          address: "Bahia de las Brisas",
          image: "https://picsum.photos/seed/paddle/1200/700",
          creator: { id: "user-1", name: "Usuario de prueba" },
        },
      ],
    }).as("getPlans");

    cy.visit("/plans/new", {
      onBeforeLoad(window) {
        window.localStorage.setItem("id", "user-1");
        window.localStorage.setItem("username", "Usuario de prueba");
      },
    });

    cy.get('input[placeholder="Nombre del plan"]')
      .type("Tarde de paddle surf");
    cy.get('input[placeholder="Link de imagen"]')
      .type("https://picsum.photos/seed/paddle/1200/700");
    cy.get('input[placeholder="Dirección"]')
      .type("Bahia de las Brisas");
    cy.get('input[placeholder="Precio estimado"]').type("65000");
    cy.get('input[placeholder="Duración en minutos"]').type("150");
    cy.get('textarea[placeholder="Descripción del plan"]')
      .type("Una tarde remando por la bahia.");
    cy.get('textarea[placeholder*="Recomendaciones"]')
      .type("Llevar protector solar");

    cy.contains("button", "Publicar plan").click();

    cy.wait("@createPlan");
    cy.url().should("include", "/plans");
    cy.contains("Tarde de paddle surf").should("be.visible");
  });
});