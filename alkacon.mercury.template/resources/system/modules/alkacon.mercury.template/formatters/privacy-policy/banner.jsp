<%@page
    pageEncoding="UTF-8"
    buffer="none"
    session="false"
    trimDirectiveWhitespaces="true"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="cms" uri="http://www.opencms.org/taglib/cms"%>
<%@ taglib prefix="mercury" tagdir="/WEB-INF/tags/mercury" %>

<cms:formatter var="content" val="value">

<c:set var="disabledMessage"    value="${fn:replace(cms:stripHtml(value.DisabledMessage), '\"', '')}" />
<c:set var="ignore"             value="${cms.requestContext.setUri(param.path)} }" />

<c:set var="bannerHtml">
    <mercury:nl />
    <!DOCTYPE html><%----%>
    <html><%----%>
    <body><%----%>

    <div><%-- Outer DIV required otherwise JavaScript does not work --%>
    <div class="banner"><%----%>
        <div class="container"><%----%>
            <div class="title">${value.Title}</div><%----%>
            <div class="selection">
                <div class="options"><%----%>
                    <label for="use-technical"><%----%>
                        <input id="use-technical" type="checkbox" checked disabled><i></i><%----%>
                        <span>Essenziell</span><%----%>
                    </label><%----%>
                    <label for="use-external"><%----%>
                        <input id="use-external" type="checkbox"><i></i><%----%>
                        <span>Externe Inhalte</span><%----%>
                    </label><%----%>
                    <label for="use-statistical"><%----%>
                        <input id="use-statistical" type="checkbox"><i></i><%----%>
                        <span>Statistiken</span><%----%>
                    </label><%----%>
                </div><%----%>
                <div class="buttons"><%----%>
                    <c:if test="${value.DeclineButtonText.isSet}"><%--
                    --%><a class="btn btn-save">${value.DeclineButtonText}</a><%--
                --%></c:if><%--
                --%><a class="btn btn-accept">${value.AcceptButtonText}</a><%----%>
                </div><%----%>
            </div><%----%>
            <div class="message"><%----%>
                <div>${value.PolicyText}</div><%----%>
            </div><%----%>
        </div><%----%>
    </div><%----%>
    </div><%----%>

    </body><%----%>
    </html><%----%>
    <mercury:nl />
</c:set>

<cms:jsonobject var="bannerData">
    <cms:jsonvalue key="content" value="${content.json}" mode="object" />
    <cms:jsonvalue key="html" value="${bannerHtml}" />
</cms:jsonobject>

<%----%>${bannerData.verbose}<%----%>

</cms:formatter>