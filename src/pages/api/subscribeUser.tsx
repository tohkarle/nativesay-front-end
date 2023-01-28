import fetch from "isomorphic-unfetch";
import md5 from "md5";

// TODO: move to service layer
const subscribeUser = async (req: any, res: any) => {
  const { email, firstName, lastName } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const DATACENTER = process.env.MAILCHIMP_API_SERVER;

    // check if user already exists
    const existingResponse = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${md5(
        email
      )}`,
      {
        headers: {
          Authorization: `apikey ${API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );

    if (existingResponse.status === 200) {
      return res.status(200).json({
        message: "User already exists in the mailing list.",
      });
    }

    // if user doesn't exist, create new subscriber
    const data = {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      },
    };

    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,

      {
        body: JSON.stringify(data),
        headers: {
          Authorization: `apikey ${API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );

    if (response.status >= 400) {
      return res.status(400).json({
        error: `There was an error subscribing to the newsletter.`,
      });
    }

    return res.status(201).json({ error: "" });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};

export default subscribeUser;
