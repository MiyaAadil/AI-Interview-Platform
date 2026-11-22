import { Router } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware, AuthRequest } from "../middlewares/authMiddleware";
import { applicationSchema } from "../schemas/application.schema";

const router = Router();

router.use(authMiddleware);

// GET method
router.get("/", async (req: AuthRequest, res) => {

    const applications = await prisma.application.findMany({
        where: { userId: req.user!.id },
        orderBy: { createdAt: "desc" }
    });

    res.status(200).json({ applications })
})

// GET by id method 
router.get("/:id", async (req: AuthRequest, res) => {

    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }

    const application = await prisma.application.findFirst({
        where: { id, userId: req.user!.id },
    });

    if (!application) {
        res.status(404).json({ error: "Application not found" });
    }

    res.json(application);
});


// POST method
router.post("/", async (req: AuthRequest, res) => {
    const result = applicationSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ error: result.error.issues });
    }

    const { company, role, status } = result.data;

    const newApp = await prisma.application.create({ data: {
        userId: req.user!.id, company, role, status
    }})
    res.status(201).json({ message: "Application created successfully", newApp })
})


// PUT method
router.put("/:id", async (req: AuthRequest, res) => {
    
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }
    
    const result = applicationSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: result.error.issues });
    }
    const { company, role, status } = result.data;

    const application = await prisma.application.findFirst({
        where: { id, userId: req.user!.id },
    });

    if (!application) {
        return res.status(404).json({ error: "Application not found" });
    }

    const updatedApp = await prisma.application.update({ 
        where: { id },
        data: { company, role, status }})

    res.json(updatedApp);
})


// DELETE method
router.delete("/:id", async (req: AuthRequest, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" })
    }
    
    const application = await prisma.application.findFirst({
        where: { id, userId: req.user!.id },
    });

    if (!application) {
        return res.status(404).json({ error: "Application not found" });
    }

    const deletedApp = await prisma.application.delete({ where: { id }})
    res.status(200).json({ message: "Application deleted successfully" });
})

export default router
