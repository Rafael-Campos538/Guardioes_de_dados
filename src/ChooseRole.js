class ChooseRole extends Phaser.Scene {
    constructor() {
        super({ key: "ChooseRole" });
    }

    preload() {
        this.load.image("painel", "assets/imagens/painel_retangular.png");
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.cameras.main.setBackgroundColor("#1e1e1e");

        this.add.text(centerX, centerY - 150, "Escolha seu papel", {
            fontSize: "28px",
            fill: "#FFD700",
            fontFamily: "rainyhearts",
            resolution: 10
        }).setOrigin(0.5);

        let professorButton = this.add.sprite(centerX, centerY - 50, "painel").setScale(1.2, 1.2).setInteractive();
        let alunoButton = this.add.sprite(centerX, centerY + 50, "painel").setScale(1.2, 1.2).setInteractive();
        alunoButton.on("pointerdown", () => this.scene.start("Conversation"));
        let voltarButton = this.add.sprite(centerX, centerY + 150, "painel").setScale(1.2, 1.2).setInteractive();

        let professorText = this.add.text(centerX, centerY - 50, "Professor", {
            fontSize: "18px",
            fill: "#FFFFFF",
            fontFamily: "OldSchoolAdventures",
            resolution: 10
        }).setOrigin(0.5);

        let alunoText = this.add.text(centerX, centerY + 50, "Aluno", {
            fontSize: "18px",
            fill: "#FFFFFF",
            fontFamily: "OldSchoolAdventures",
            resolution: 10
        }).setOrigin(0.5);

        let voltarText = this.add.text(centerX, centerY + 150, "Voltar", {
            fontSize: "18px",
            fill: "#FFFFFF",
            fontFamily: "OldSchoolAdventures",
            resolution: 10
        }).setOrigin(0.5);

        professorButton.on("pointerover", () => professorText.setColor("#000000"));
        professorButton.on("pointerout", () => professorText.setColor("#FFFFFF"));
        professorButton.on("pointerdown", () => console.log("Professor selecionado"));

        alunoButton.on("pointerover", () => alunoText.setColor("#000000"));
        alunoButton.on("pointerout", () => alunoText.setColor("#FFFFFF"));
        alunoButton.on("pointerdown", () => {
            this.scene.start("Conversation");
        });
        

        voltarButton.on("pointerover", () => voltarText.setColor("#000000"));
        voltarButton.on("pointerout", () => voltarText.setColor("#FFFFFF"));
        voltarButton.on("pointerdown", () => this.scene.start("MainMenu"));
    }
}

window.ChooseRole = ChooseRole;
