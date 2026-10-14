import React, { useState } from "react";
import { Mail, Send } from "lucide-react";

const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL;

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [notice, setNotice] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!supportEmail) {
      setNotice("Customer support email is not configured yet.");
      return;
    }

    const body = [
      `Name: ${formData.name}`,
      `Reply email: ${formData.email}`,
      "",
      formData.message,
    ].join("\n");
    const mailto = `mailto:${supportEmail.trim()}?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setNotice(
      "Your email app should open with this message. Send it there to contact support."
    );
  };

  return (
    <main className="min-h-screen bg-[#f4f1ea] px-5 pb-20 pt-10 text-[#20201d] sm:px-10 sm:pt-14 lg:px-[8vw]">
      <div className="mx-auto max-w-[1200px]">
        <header className="max-w-2xl border-b border-[#d7d1c6] pb-8">
          <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-[#817b70]">
            We're here to help
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl">Contact GenZio</h1>
          <p className="mt-4 text-sm leading-6 text-[#69655d]">
            Send a question about the collection or your account. We will only
            say a message has been sent after you send it from your email app.
          </p>
        </header>

        <section className="mt-10 grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="border border-[#d7d1c6] bg-[#eeebe4] p-6">
            <Mail className="h-5 w-5 text-[#555c45]" aria-hidden="true" />
            <h2 className="mt-4 font-serif text-2xl">Email support</h2>
            {supportEmail ? (
              <>
                <p className="mt-2 break-all text-sm text-[#514b42]">
                  {supportEmail}
                </p>
                <p className="mt-4 text-xs leading-5 text-[#69655d]">
                  Email delivery is handled by your email provider.
                </p>
              </>
            ) : (
              <p className="mt-2 text-sm leading-6 text-[#69655d]">
                A support email address has not been configured for this
                storefront.
              </p>
            )}
          </div>

          <div className="border border-[#d7d1c6] p-5 sm:p-7">
            <h2 className="font-serif text-2xl">Write to us</h2>
            {notice && (
              <p role="status" className="mt-4 bg-[#eeebe4] p-3 text-xs leading-5">
                {notice}
              </p>
            )}
            {supportEmail ? (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs">
                    Name
                    <input
                      name="name"
                      value={formData.name}
                      onChange={(event) =>
                        setFormData({ ...formData, name: event.target.value })
                      }
                      autoComplete="name"
                      required
                      className="mt-2 min-h-11 w-full border border-[#cfc8ba] bg-transparent px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e]"
                    />
                  </label>
                  <label className="block text-xs">
                    Email
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(event) =>
                        setFormData({ ...formData, email: event.target.value })
                      }
                      autoComplete="email"
                      required
                      className="mt-2 min-h-11 w-full border border-[#cfc8ba] bg-transparent px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e]"
                    />
                  </label>
                </div>
                <label className="block text-xs">
                  Subject
                  <input
                    name="subject"
                    value={formData.subject}
                    onChange={(event) =>
                      setFormData({ ...formData, subject: event.target.value })
                    }
                    required
                    className="mt-2 min-h-11 w-full border border-[#cfc8ba] bg-transparent px-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e]"
                  />
                </label>
                <label className="block text-xs">
                  Message
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={(event) =>
                      setFormData({ ...formData, message: event.target.value })
                    }
                    required
                    className="mt-2 w-full border border-[#cfc8ba] bg-transparent p-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e]"
                  />
                </label>
                <p className="text-[11px] leading-5 text-[#69655d]">
                  Submitting opens your email app; you still need to send the
                  message there.
                </p>
                <button
                  type="submit"
                  className="inline-flex min-h-11 items-center gap-2 bg-[#20201d] px-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#f4f1ea] transition-colors hover:bg-[#45483b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8c6b3e]"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Prepare email
                </button>
              </form>
            ) : (
              <p className="mt-4 text-sm leading-6 text-[#69655d]">
                The contact form becomes available once the store owner sets
                the <code>VITE_SUPPORT_EMAIL</code> configuration value.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};
