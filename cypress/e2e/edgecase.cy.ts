//plan donde el flujo de creacion falla

describe("Creacion de un plan", () => {
  it("muestra un error si el usuario no ha iniciado sesión", () => {
    cy.visit("/plans/new");
    cy.get('input[placeholder="Nombre del plan"]').type("Tarde de paddle surf");
    cy.get('input[placeholder="Link de imagen"]').type(
      "https://picsum.photos/seed/paddle/1200/700"
    );
    cy.get('input[placeholder="Dirección"]').type("Bahia de las Brisas"); 
    cy.get('input[placeholder="Precio estimado"]').type("65000");
    });
  
    describe("Casos alternos de creacion de un plan", () => {
      function fillPlan() {
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
      }
  
      it("muestra un error si el usuario no ha iniciado sesion", () => {
        cy.visit("/plans/new");
        fillPlan();
  
        cy.contains("button", "Publicar plan").click();
  
        cy.contains("Debes iniciar sesión para publicar un plan")
          .should("be.visible");
      });
  
      it("muestra el error devuelto por el backend", () => {
        cy.intercept("POST", "**/plans", {
          statusCode: 400,
          body: { message: "No se pudo crear el plan" },
        }).as("createPlanError");
  
        cy.visit("/plans/new", {
          onBeforeLoad(window) {
            window.localStorage.setItem("id", "user-1");
          },
        });
        fillPlan();
  
        cy.contains("button", "Publicar plan").click();
  
        cy.wait("@createPlanError");
        cy.contains("No se pudo crear el plan").should("be.visible");
      });
    });
    });
