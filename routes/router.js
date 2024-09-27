const express = require("express");
const router = express.Router();

const quadra = require("./quadra");
const servico = require("./servico");
const horario = require("./horario");
const agendamento = require("./agendamento");
const quadraServico = require("./quadraServico");
const cliente = require("./cliente");
const confirmacaoEmail = require("./enviarEmail");
const cancelar = require("./cancelamento");
const permisao =  require("./permisao.js");

const formatoHora = require("../utils/formatoHora.js");
router.route("/horaformato").post((req, res)=> formatoHora.create(req, res))

/**
 * @swagger
 * /agendamento:
 *   post:
 *     summary: Create a new agendamento (booking)
 *     description: Create a new booking for a court.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: The date and time for the booking.
 *                   example: ["2024", "09", "01", "14:00"]
 *               transacao:
 *                 type: string
 *                 description: The transaction ID.
 *                 example: "123456"
 *               quadra:
 *                 type: integer
 *                 description: The court number.
 *                 example: 1
 *               servico:
 *                 type: string
 *                 description: The service modality.
 *                 example: "Futebol"
 *               horas:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: The hours for the booking.
 *                   example: ["14:00", "15:00"]
 *     responses:
 *       201:
 *         description: Booking created successfully.
 *       400:
 *         description: Invalid input.
 *   get:
 *     summary: Get all booked courts
 *     description: Retrieve a list of all booked courts. Only accessible by admins.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of booked courts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   quadra:
 *                     type: integer
 *                     description: The court number.
 *                     example: 1
 *                   modalidade:
 *                     type: string
 *                     description: The service modality.
 *                     example: "Futebol"
 *                   data:
 *                     type: string
 *                     description: The booking date and time.
 *                     example: "2024/09/01/14:00"
 *                   valor:
 *                     type: number
 *                     description: The booking value.
 *                     example: 100.00
 *       403:
 *         description: Unauthorized access.
 */
/**
 * @swagger
 * /quadras-disponiveis:
 *   post:
 *     summary: Get available courts
 *     description: Retrieve a list of available courts for booking.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               servico:
 *                 type: string
 *                 description: The service modality.
 *                 example: "Futebol"
 *               data:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: The date for which to check availability.
 *                   example: ["2024", "09", "01"]
 *     responses:
 *       200:
 *         description: A list of available courts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   quadra:
 *                     type: integer
 *                     description: The court number.
 *                     example: 1
 *                   hora:
 *                     type: string
 *                     description: The available time slot.
 *                     example: "14:00"
 *       400:
 *         description: Invalid input.
 */
/**
 * @swagger
 * /servico-quadra:
 *   post:
 *     summary: Associate a service with a court
 *     description: Associate a specific service with a court.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quadra:
 *                 type: integer
 *                 description: The court number.
 *                 example: 1
 *               servico:
 *                 type: string
 *                 description: The service modality.
 *                 example: "Futebol"
 *     responses:
 *       201:
 *         description: Service associated successfully.
 *       200:
 *         description: The service is already associated with the court.
 *       400:
 *         description: Invalid input.
 */
/**
 * @swagger
 * /meus-agendamentos:
 *   post:
 *     summary: Get user's bookings
 *     description: Retrieve a list of the user's bookings.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of the user's bookings.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   hora:
 *                     type: string
 *                     description: The booking time.
 *                     example: "14:00"
 *                   data:
 *                     type: string
 *                     description: The booking date.
 *                     example: "2024/09/01"
 *                   modalidade:
 *                     type: string
 *                     description: The service modality.
 *                     example: "Futebol"
 *                   numero:
 *                     type: integer
 *                     description: The court number.
 *                     example: 1
 *                   transacao:
 *                     type: string
 *                     description: The transaction ID.
 *                     example: "123456"
 *                   valor:
 *                     type: number
 *                     description: The booking value.
 *                     example: 100.00
 *       403:
 *         description: Unauthorized access.
 */

router.use('/', cancelar);

router.use('/', confirmacaoEmail)

router.use('/', cliente);

router.use("/", horario);

router.use("/", servico);
 
router.use("/", quadra);

router.use("/", agendamento);

router.use("/", quadraServico);

router.use('/', permisao);



module.exports = router;