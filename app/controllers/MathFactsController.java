package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.MathFactsService;

import javax.inject.Inject;

public class MathFactsController extends Controller {

    private final MathFactsService service;

    @Inject
    public MathFactsController(MathFactsService service) {
        this.service = service;
    }

    public Result index() {
        return ok(views.html.index.render());
    }

    public Result facts(long n) {
        ObjectNode result = Json.newObject();
        result.put("n", n);
        result.put("prime", service.isPrime(n));
        return ok((JsonNode) result);
    }
}
