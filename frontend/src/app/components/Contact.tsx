import { useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { MapPin, Phone, Clock, Mail, Loader2 } from "lucide-react";
import { apiFetch, ApiError } from "../../lib/api";

export function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(
    null,
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      await apiFetch("/messages", {
        method: "POST",
        body: {
          first_name: firstName,
          last_name: lastName,
          email,
          phone: phone || undefined,
          message,
        },
      });
      setFeedback({ type: "success", text: "Votre message a bien été envoyé. Nous vous répondrons rapidement." });
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      setFeedback({
        type: "error",
        text: err instanceof ApiError ? err.message : "Une erreur est survenue. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 text-gray-900">Contactez-Nous</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Prêt à offrir à votre voiture le soin qu&apos;elle mérite ?
            Contactez-nous dès aujourd&apos;hui pour prendre rendez-vous ou
            obtenir un devis personnalisé pour votre véhicule.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                    Adresse
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Bloc Assa
                    <br />
                    Num 8, Extention Dakhla
                    <br />
                    Agadir, Maroc
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="w-5 h-5 text-blue-600 mr-2" />
                    Téléphone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">06 70 50 47 26</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="w-5 h-5 text-blue-600 mr-2" />
                    E-mail
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">info@achrafwash.com</p>
                  <p className="text-gray-600">reservation@achrafwash.com</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 text-blue-600 mr-2" />
                    Horaires
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-gray-600">
                    <div className="flex justify-between">
                      <span>Lundi - Vendredi :</span>
                      <span>9h00 - 21h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Samedi :</span>
                      <span>10h00 - 21h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dimanche :</span>
                      <span>10h00 - 17h00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Envoyez-nous un Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block mb-2">
                        Prénom
                      </label>
                      <Input
                        id="firstName"
                        placeholder="Votre prénom"
                        required
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block mb-2">
                        Nom
                      </label>
                      <Input
                        id="lastName"
                        placeholder="Votre nom"
                        required
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block mb-2">
                        E-mail
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre.email@exemple.com"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block mb-2">
                        Téléphone
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="06 12 34 56 78"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Parlez-nous de votre véhicule et de vos besoins particuliers..."
                      rows={4}
                      required
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>

                  {feedback && (
                    <p
                      role="alert"
                      className={
                        feedback.type === "success"
                          ? "text-sm text-green-600"
                          : "text-sm text-destructive"
                      }
                    >
                      {feedback.text}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      "Envoyer le Message"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 bg-blue-600 text-white rounded-2xl p-8">
          <h3 className="text-3xl mb-4">Prêt à Réserver votre Lavage ?</h3>
          <p className="text-xl mb-6 text-blue-100">
            Appelez-nous maintenant ou venez directement. Aucun rendez-vous
            nécessaire pour les lavages basiques !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => {
                window.location.href = "tel:+212670504726";
              }}
            >
              Appeler le 06 70 50 47 26
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/place/Bloc+Assa,+Agadir+80000/@30.4070821,-9.5599042,19.59z/data=!4m6!3m5!1s0xdb3b6332b14df43:0xc903fef73dbb635e!8m2!3d30.4072567!4d-9.5591771!16s%2Fg%2F11b6_mhb76?entry=ttu&g_ep=EgoyMDI2MDgwNS4xIKXMDSoASAFQAw%3D%3D",
                  "_blank",
                )
              }
            >
              Obtenir l&apos;Itinéraire
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
